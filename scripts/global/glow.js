// Function to check the mouse position to display the glow
const glowOnMouse = (e) => {
  // Condition to check if light theme is on, if it is, do not run the function
  if (!document.body.classList.contains("light_theme")) {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }
};

// glowing effect for elements in a flexbox layout
function flexboxGlows(cardContainer) {
  for (const card of cardContainer) {
    card.onmousemove = (e) => glowOnMouse(e);

    card.addEventListener("mouseenter", function () {
      // remove the transititon delay after the elements have shown already
      card.style.transitionDelay = "0s";
      if (!document.body.classList.contains("light_theme")) {
        card.style.setProperty("--before_opacity", "1");
      }
    });

    card.addEventListener("mouseleave", function () {
      card.style.setProperty("--before_opacity", "0");
    });
  }
}

// glowing effect for element in a grid layout, different as the size is different and may need a larger glow
function gridGlows(cardContainer) {
  // Loop through all the portfolio_card class to implement the function in it
  for (const card of cardContainer) {
    card.onmousemove = (e) => glowOnMouse(e);

    // Hover effect for the card within the container
    card.addEventListener("mouseenter", function () {
      // remove the transititon delay after the elements have shown already
      card.style.transitionDelay = "0s";
      if (!document.body.classList.contains("light_theme")) {
        card.style.setProperty("--before_opacity", "1");
      }
      // If the card is larger, increase the size of the glow
      if (card.classList.contains("large")) {
        card.style.setProperty("--glow_size", "1400px");
      }
    });

    // reset back to the old styles when no longer hover
    card.addEventListener("mouseleave", function () {
      card.style.setProperty("--before_opacity", "0");
      card.style.setProperty("--glow_size", "800px");
    });
  }
}

function logLoadingProgress(percentage) {
  counterElement.textContent = percentage;
}

let counterElement = document.querySelector(".counter");
const overlayElement = document.querySelector(".overlay");

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  const totalImages = images.length;
  let loadedImages = 0;

  if (totalImages === 0) {
    return;
  }

  images.forEach((img) => {
    // If the image is already cached, increment the counter
    if (img.complete) {
      incrementCounter();
    } else {
      // Listen for the load and error events
      img.addEventListener("load", incrementCounter);
      img.addEventListener("error", incrementCounter);
    }
  });

  function incrementCounter() {
    loadedImages++;
    const percentage = (loadedImages / totalImages) * 100;
    logLoadingProgress(percentage.toFixed(0));
    console.log("loading");
  }
});

// Log 100% when the entire page has fully loaded
window.addEventListener("load", () => {
  console.log("loaded");
  gsap.to(".counter", 0.25, {
    opacity: 0,
  });

  gsap.to(".bar", 1.2, {
    x: "-500%",
    stagger: {
      amount: -0.5,
    },
    ease: "power4.inOut",
  });

  gsap.to(".car", 1.2, {
    x: "500%",
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  setTimeout(() => {
    if (counterElement) counterElement.remove();
    if (overlayElement) overlayElement.remove();
  }, 1000); // 2000 milliseconds = 2 seconds

  document.querySelectorAll(".extra_delay").forEach((element) => {
    element.style.transitionDelay = "1000ms"; // Apply the delay here
  });
});
