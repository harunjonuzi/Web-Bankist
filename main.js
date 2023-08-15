"use strict";
///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault(); // prevent default behaviour of the link
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Instead of using this, we can use the forEach method
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

// forEach method
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////
/// PlayGround ///
//////////////////

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const section1coords = section1.getBoundingClientRect();

  // log the coordinates
  console.log(section1coords);
  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   section1coords.left + window.pageXOffset,
  //   section1coords.top + window.pageYOffset
  // );

  // ! Old way , smooth scrolling
  // window.scrollTo({
  //   left: section1coords.left + window.pageXOffset,
  //   top: section1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // ! New way , smooth scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

// ! Types of Events and event handlers
// const h1 = document.querySelector("h1");

// * Version A (Adding function from inside)
// h1.addEventListener(
//   "mouseenter",
//   function (e) {
//     alert("addEventListener: You are reading the heading!");
//   },
//   { once: true }
// );

// * Version B (Adding function from the outside)
// const alertH1 = function (e) {
//   alert("addEventListener: Great! You are reading the heading :D!");
//   // We can remove the event here
//   // h1.removeEventListener("mouseenter", alertH1);
// };
// h1.addEventListener("mouseenter", alertH1);

// We can remove the event anywhere
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 5000);

// * Other
// h1.onmouseenter = function (e) {
//   alert("onmouseenter: You are reading the heading!");
// };

// const buttonZ = document.querySelector(".btn--text");
// buttonZ.addEventListener("click", function () {
//   alert("You clicked a button on the page!");
// });

// ! Event Bubbling & Capturing
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

console.log(randomInt(0, 10));

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINKSS", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAVV", e.target, e.currentTarget);
});
