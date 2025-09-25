// Animation below is for when the element is viewed after 150px

const appearOptions = {
  rootMargin: "0px 0px -150px 0px",
};

// function for the javascript to detect when the element is within user view
const observerLast = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observerLast.unobserve(entry.target);
    } else {
      entry.target.classList.remove("show");
    }
  });
}, appearOptions);

// Animation below is for when the element is viewed slightly after 50px

const delayOptions = {
  rootMargin: "0px 0px -50px 0px",
};

const observerFirst = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observerFirst.unobserve(entry.target);
    } else {
      entry.target.classList.remove("show");
    }
  });
}, delayOptions);

// to get all classes element and cast the scroll reveal animation on them
// this animation is for fading out to the page
const fadeElements = document.querySelectorAll(".fade");
fadeElements.forEach((el) => observerLast.observe(el));

// animation to fade upwards
const fadeUpElements = document.querySelectorAll(".fadeUp");
fadeUpElements.forEach((el) => observerFirst.observe(el));

// animation to only move upwards
const moveUpElements = document.querySelectorAll(".moveUp");
moveUpElements.forEach((el) => observerFirst.observe(el));

// animation to fade downwards
const fadeDownElements = document.querySelectorAll(".fadeDown");
fadeDownElements.forEach((el) => observerFirst.observe(el));

// animation to fade from the left to right
const fadeLeftElements = document.querySelectorAll(".fadeLeft");
fadeLeftElements.forEach((el) => observerLast.observe(el));

// animation to fade from right to left
const fadeRightElements = document.querySelectorAll(".fadeRight");
fadeRightElements.forEach((el) => observerLast.observe(el));

// animation to only move downwards
const moveDownElements = document.querySelectorAll(".moveDown");
moveDownElements.forEach((el) => observerLast.observe(el));

var count = 0;
window.addEventListener("load", () => {
  count += 1;
  console.log(count);
});
