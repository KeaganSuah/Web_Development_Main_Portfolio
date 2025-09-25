// hero-parallax.js
// Assumes GSAP + ScrollTrigger + Typed.js are already loaded.

window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const parallax = document.querySelector(".parallax");
  const about = document.getElementById("about");

  // Ensure nothing is faded/hidden from any previous logic
  gsap.set(["#moon", "#astronaut"], {
    opacity: 1,
    clearProps: "visibility",
  });

  // Scroll range: from start of hero to the top of the About section
  const range = {
    trigger: parallax,
    start: "top top",
    endTrigger: about,
    end: "top top",
    scrub: true,
    invalidateOnRefresh: true,
  };

  /* ========== MOON: rotate with scroll (fixed Y, no fade) ========== */
  gsap.fromTo(
    "#moon img",
    { rotation: 0 },
    {
      rotation: 40,
      ease: "none",
      scrollTrigger: range,
    }
  );

  /* ========== ASTRONAUT: sway ±15° around top-left + gently drift down ========== */
  const swings = 2; // how many full swings across the scroll range
  const deg = 15; // swing amplitude (degrees)
  const followFactor = 1.15; // >1 moves slightly faster down than the page

  // Pivot at top-left so the astronaut rotates from that corner
  gsap.set("#astronaut", { transformOrigin: "0% 0%", y: 0 });

  ScrollTrigger.create({
    ...range,
    onUpdate(self) {
      const angle = Math.sin(self.progress * swings * Math.PI * 2) * deg;

      // Compute extra downward drift in px (relative to range length)
      const distance = self.end - self.start;
      const scrolledPx = self.progress * distance;
      const extraDown = scrolledPx * (followFactor - 1.0);

      gsap.set("#astronaut", {
        rotation: angle,
        y: extraDown,
      });
    },
  });

  ScrollTrigger.refresh();
});

/* ========== Typed.js (unchanged) ========== */
const typing = new Typed(".multiple-text-header", {
  strings: ["Print", "Console.log", "std::cout﹤﹤"],
  typeSpeed: 70,
  backSpeed: 50,
  backDelay: 1600,
  loop: true,
});

const typed = new Typed(".multiple-text", {
  strings: ["Cloud Engineer", "DevOps Engineer", "Software Engineer"],
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 1600,
  loop: true,
});
