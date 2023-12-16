"use strict";

// add Event on multiple elements

const addEventOnElement = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]"),
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElement(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElement(navLinks, "click", closeNav);

// header

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", activeElementOnScroll);

// TEXT ANIMATION EFFECT FOR HERO SECTION

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    const letters = letterBoxes[i].textContent.trim();
    letterBoxes[i].textContent = "";

    for (let j = 0; j < letters.length; j++) {
      const span = document.createElement("span");

      span.style.animationDelay = `${letterAnimationDelay}s`;

      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      span.textContent = letters[j];

      if (letters[j] === " ") span.classList.add("space");

      letterBoxes[i].appendChild(span);

      if (j >= letters.length - 1) break;

      letterAnimationDelay += 0.05;
    }

    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;

    setLetterEffect();
  }, totalLetterBoxDelay * 1000 + 3000);
};

window.addEventListener("load", setLetterEffect);

// back to top

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset; // Cross-browser compatibility

  const scrollPercent = (scrollY / (bodyHeight - windowHeight)) * 100;

  backTopBtn.textContent = `${scrollPercent.toFixed(0)}%`;

  if (scrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

// Scroll Reveal

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  revealElements.forEach((element) => {
    const elementIsInScreen =
      element.getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      element.classList.add("revealed");
    } else {
      element.classList.remove("revealed");
    }
  });
};

window.addEventListener("scroll", scrollReveal);

// Initial check when the page loads
scrollReveal();
