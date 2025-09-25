// DOM object of the overall scroller container
const scrollers = document.querySelectorAll(".scroll_container");

// Respect reduced motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // prevent double-initializing if this runs again
    if (scroller.dataset.animated === "true") return;

    scroller.setAttribute("data-animated", "true");

    const scrollerInner = scroller.querySelector(".scroller_inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // duplicate once to achieve a perfect -50% loop
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
