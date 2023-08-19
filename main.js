"use strict";
///////////////////////////////////////
// * 1.0 Selecting dom elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// * 2.0 Modal window
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

// * 3.0 Close modal forEach method
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// * 4.0 Smooth scrolling
// ? With Event Delegation
// TODO Add event listener to common parent element
// TODO Determine what element originated the event

document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const clickElement = event.target;

    // TODO Matching strategy
    if (clickElement.classList.contains("nav__link")) {
      const targetId = clickElement.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      console.log(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });

// ? Without Event Delegation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);

//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

// * 4.1 Smooth scrolling specific button Learn more
btnScrollTo.addEventListener("click", function (e) {
  const section1coords = section1.getBoundingClientRect();
  console.log(section1coords);

  // New way , smooth scrolling
  section1.scrollIntoView({ behavior: "smooth" });

  // Old way , smooth scrolling
  // window.scrollTo({
  //   left: section1coords.left + window.pageXOffset,
  //   top: section1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Coordinates console log
  // // getBoundingClientRect()
  // console.log(section1coords);
  // console.log(e.target.getBoundingClientRect());

  // // window.pageXOffset
  // console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  // // document.documentElement.clientHeight
  // console.log(
  //   "height/width viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
});

// * 5.0 Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// TODO With event Delegation
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // TODO 5.1 Remove Active classes
  // Remove all button hoverings
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  // Remove all content from all tabs
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));

  // TODO 5.2 Add active classes
  console.log(clicked.dataset.tab);

  // Add button hovering to the clicked button
  clicked.classList.add("operations__tab--active");
  // Add content showing to the clicked button
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Without event delegation
// ? What if we have 200 tabs? we will have 200 of those callback functions
// tabs.forEach((t) =>
//   t.addEventListener("click", () => {
//     console.log("Click");
//   })
// );
