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

// ! Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector(".header");

// Example 1.0
const allSections = document.querySelectorAll(".section");
console.log(allSections); // Nodelist

// Example 2.0
document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // HTML Collection

// ! Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookiees!";
message.innerHTML =
  'We use cookiees for improved functionality and safety for our users and clients. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// ! Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// ! Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.height); // Doesn't work because it is not inline styles
console.log(message.style.backgroundColor); // Worked because it's inline

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// ! Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standart
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
