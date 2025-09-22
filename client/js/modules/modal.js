function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show");
  modal.classList.remove("hide");
  // modal.classList.toggle("show");
  document.body.style.overflow = "hidden";

  console.log(modalTimerId);
  if (modalTimerId) clearInterval(modalTimerId);
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  // modal.classList.toggle("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector);

  modalTrigger.forEach((item) => {
    item.addEventListener("click", () =>
      openModal(modalSelector, modalTimerId)
    );
  });

  modal.addEventListener("click", (e) => {
    e.target === modal || e.target.getAttribute("data-close") == ""
      ? closeModal(modalSelector)
      : "";
  });

  document.addEventListener("keydown", (e) => {
    e.code === "Escape" && modal.classList.contains("show")
      ? closeModal(modalSelector)
      : "";
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

// module.exports = modal;
export default modal;
export { openModal };
export { closeModal };
