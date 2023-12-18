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

// 2.1 Close modal forEach method
// We add the open and close modal for all the buttons that have .btn--show-modal in their class
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
// * 3.0 Smooth scrolling
// With Event Delegation, ddd event listener to common parent element, determine what element originated the event

// document.querySelector("body").addEventListener("click", function (e) {
//   console.log(e.target);
// });

// Attach a click event listener to the element with the class "nav__links"
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    // Prevent the default behavior (usually navigating to a new page) when a link is clicked
    event.preventDefault();

    // Identify the exact element that was clicked within the ".nav__links" container
    const clickedElement = event.target;

    // Check if the clicked element has the class "nav__link"
    if (clickedElement.classList.contains("nav__link")) {
      // Retrieve the value of the "href" attribute from the clicked link, like "#section--1" or "#section--2"
      const targetId = clickedElement.getAttribute("href");

      // Find the HTML element associated with the target ID, "#section--1" or "#section--2"
      const targetElement = document.querySelector(targetId);
      console.log(targetElement); // Example: <section class='section' id='section--#'></section>

      // If the target element exists in the DOM
      if (targetElement) {
        // Scroll smoothly to the target element, creating a smooth scrolling effect
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });

// 3.1 Without Event Delegation
// const navZ = document.querySelectorAll(".nav__link");

// navZ.forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();

//     // const id = this.getAttribute("href"); // either this. or el.
//     const id = el.getAttribute("href");
//     console.log(id); // #section--#

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
  // console.log(section1coords);

  // New way , smooth scrolling
  section1.scrollIntoView({ behavior: "smooth" });

  // 4.2 Old way , smooth scrolling
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
// * 5.0 Tabbed Component with Event Delegation

// Attach a click event listener to the tabs container
tabsContainer.addEventListener("click", function (e) {
  // Find the nearest ancestor element with the class "operations__tab" from the clicked target
  const clickedTab = e.target.closest(".operations__tab");

  // If no matching tab is found, exit early
  if (!clickedTab) {
    return;
  }

  // 5.1 REMOVE EVERYTHING
  // Remove the "operations__tab--active" class from all tabs
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

  // Remove the "operations__content--active" class from all content sections
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // 5.2 ADD EVERYTHING
  // Add the "operations__tab--active" class to the clicked tab for button hovering
  clickedTab.classList.add("operations__tab--active");

  // Add the "operations__content--active" class to the corresponding content section
  const clickedTabContent = document.querySelector(
    `.operations__content--${clickedTab.dataset.tab}`
  );
  if (clickedTabContent) {
    clickedTabContent.classList.add("operations__content--active");
  }
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

// 6.1 Less Complicated
// Function to handle link and logo opacity on hover
const handleNavHover = function (event, opacity) {
  // Check if the hovered element has the class "nav__link"
  if (event.target.classList.contains("nav__link")) {
    // Find the nearest nav element for context
    const navElement = event.target.closest(".nav");

    // Select all nav links and logo within the nav element
    const navLinks = navElement.querySelectorAll(".nav__link");
    const logo = navElement.querySelector("img");

    // Adjust opacity for all nav links except the hovered one
    navLinks.forEach((link) => {
      if (link !== event.target) {
        link.style.opacity = opacity;
      }
    });

    // Adjust logo opacity
    logo.style.opacity = opacity;
  }
};

// Add event listener for mouseover (hover) on the nav element
nav.addEventListener("mouseover", function (event) {
  handleNavHover(event, 0.5); // Reduce opacity on hover
});

// Add event listener for mouseout (hover out) on the nav element
nav.addEventListener("mouseout", function (event) {
  handleNavHover(event, 1); // Restore full opacity when hover out
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
  // console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  // console.log("Page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ""; // Devs used to abuse this message, so now we can not change that popup message
// });
