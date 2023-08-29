"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
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

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 3.0 Close modal forEach method
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
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

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
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

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 5.0 Tabbed Component

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

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 6.0 Mouseover nav links
// const handleHover = function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = this;
//     });

//     logo.style.opacity = this;
//   }
// };

// nav.addEventListener("mouseover", handleHover.bind(0.5));
// nav.addEventListener("mouseout", handleHover.bind(1));

// Less Complicated
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== e.target) el.style.opacity = opacity;
    });

    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 7.0 Bad Way - Sticky navigation
// 7.1 Bad way of doing it, it fires scroll event all the time
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// * 8.0 Good Way - Sticky navigation - Observer API

// Example 01
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   threshold: 0.1,
// };

// * 8.1 Separating callback from options
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// Sticky Nav
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const entry = entries[0];
  // console.log(entry);

  if (entry.isIntersecting) {
    nav.classList.remove("sticky");
  } else {
    nav.classList.add("sticky");
  }
};

const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 9 Reveal Sections
const allSections = document.querySelectorAll(".section");

const sectionCallback = function (entries, observer) {
  const [entry] = entries;

  // console.log(entries);
  // console.log(observer);

  if (!entry.isIntersecting) return; // guard clause
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target); // Stop observing after observing
};

const sectionObserver = new IntersectionObserver(sectionCallback, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 10 Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const imgCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // We did this so people with low internet only remove filter once the picture is fully loaded
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((image) => {
  imgObserver.observe(image);
});

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////
// * 11 Slides section
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length - 1;

// Functions
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

// 11.1 goToSlide function, starting position
const goToSlide = function (slideNum) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - slideNum)}%)`)
  );
};

// Default state goToSlide(0), loads the slide from the first slide
// 0%, 100%, 200%

// -100%, 0%, 100%
// -200%, -100%, 0

// 11.2 nextSlide function
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// 11.3 prevSlide function
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Initialization
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

// Event handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

//////////////////////////////
////🚧///NEW SECTION///🚧////
//////////////////////////////

// * 12 Lifecycle DOM Events
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ""; // Devs used to abuse this message, so now we can not change that popup message
// });
