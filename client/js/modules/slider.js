function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  const slider = document.querySelector(container),
    slides = document.querySelectorAll(slide),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = " all 0.5s";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset == parseFloat(width) * (slides.length - 1)) {
      // +width.slice(0, width.length - 2) | +width.slice(0, -2)
      offset = 0;
    } else {
      offset += parseFloat(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;

    currentSlide();
    activeDot();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      // +width.slice(0, width.length - 2) | +width.slice(0, -2)
      offset = parseFloat(width) * (slides.length - 1);
    } else {
      offset -= parseFloat(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;

    currentSlide();
    activeDot();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = parseFloat(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      currentSlide();
      activeDot();
    });
  });

  function currentSlide() {
    slides.length < 10
      ? (current.textContent = `0${slideIndex}`)
      : (current.textContent = slideIndex);
  }

  function activeDot() {
    dots.forEach((dot) => (dot.style.opacity = 0.5));
    dots[slideIndex - 1].style.opacity = 1;
  }

  /* function deleteNotDigits(str) {
    return +str.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  } */

  /* showSlides(slideIndex);

  slides.length < 10
    ? (total.textContent = `0${slides.length}`)
    : (total.textContent = slides.length);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((slide) => (slide.style.display = "none"));
    slides[slideIndex - 1].style.display = "block";

    slides.length < 10
      ? (current.textContent = `0${slideIndex}`)
      : (current.textContent = slideIndex);
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  prev.addEventListener("click", () => plusSlides(-1));
  next.addEventListener("click", () => plusSlides(1)); */
}

// module.exports = slider;
export default slider;
