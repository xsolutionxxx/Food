//"use strict";

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calculator from "./modules/calculator";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    50000
  );

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  timer(".timer", "2025-10-11");
  modal("[data-modal]", ".modal", modalTimerId);
  cards();
  forms("form", modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  calculator();
});
