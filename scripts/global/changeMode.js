/* changeMode.js — theme toggle + skill icon swap (AWS/GitHub) */
(function () {
  "use strict";

  // === Elements / globals ===
  const icon = document.getElementById("theme");
  const lightTheme = "light_theme";
  const darkThemeIcon = "bx bxs-moon";
  const lightThemeIcon = "bx bxs-bulb";

  // Allow other scripts to register glowable card containers
  // (we reuse your global if it already exists)
  window.cardContainerArray = window.cardContainerArray || [];
  const cardContainerArray = window.cardContainerArray;

  // === Card styling helpers (unchanged behavior) ===
  function summaryDark(containers) {
    for (const card of containers) {
      card.style.background = "rgb(var(--gray-200), 0.02)";
      card.style.boxShadow = "0px 0px 3px 1.2px rgb(var(--gray-700))";
    }
  }

  function summaryLight(containers) {
    for (const card of containers) {
      card.style.background =
        "linear-gradient(331deg, rgb(var(--gray-900), 0.3), rgb(var(--gray-1000)))";
      card.style.boxShadow = "0px 0px 15px 2px rgb(var(--gray-600),0.3)";
    }
  }

  // === Theme helpers ===
  function getCurrentTheme() {
    return document.body.classList.contains(lightTheme) ? "light" : "dark";
  }

  function getCurrentIcon() {
    // returns the class name string that should be on the icon
    return document.body.classList.contains(lightTheme)
      ? darkThemeIcon
      : lightThemeIcon;
  }

  function setIconClass() {
    if (!icon) return;
    icon.className = getCurrentIcon();
  }

  // === Swap skill icons when theme changes ===
  // Matches by alt text and by filename so it’s resilient
  function setSkillIconsByTheme() {
    const isLight = document.body.classList.contains(lightTheme);

    const pairs = [
      {
        // AWS
        sel: 'img[alt*="AWS" i], img[src*="/skills/aws-"]',
        lightSrc: "/static/about/skills/aws-b.png", // black for light theme
        darkSrc: "/static/about/skills/aws-w.png", // white for dark theme
      },
      {
        // GitHub
        sel: 'img[alt*="GitHub" i], img[src*="/skills/github-"]',
        lightSrc: "/static/about/skills/github-b.png",
        darkSrc: "/static/about/skills/github-w.png",
      },
      {
        // Django
        sel: 'img[alt*="Django" i], img[src*="/skills/django-"]',
        lightSrc: "/static/about/skills/django.png",
        darkSrc: "/static/about/skills/django_w.png",
      },
      {
        // flask
        sel: 'img[alt*="flask" i], img[src*="/skills/flask-"]',
        lightSrc: "/static/about/skills/flask.png",
        darkSrc: "/static/about/skills/flask_w.png",
      },
      {
        // Bash
        sel: 'img[alt*="Bash" i], img[src*="/skills/bash-"]',
        lightSrc: "/static/about/skills/bash.png",
        darkSrc: "/static/about/skills/bash_w.png",
      },
    ];

    pairs.forEach(({ sel, lightSrc, darkSrc }) => {
      document.querySelectorAll(sel).forEach((img) => {
        const wanted = isLight ? lightSrc : darkSrc;
        if (img.getAttribute("src") !== wanted) {
          img.setAttribute("src", wanted);
        }
      });
    });
  }

  // === Apply theme (UI + storage) ===
  function applyTheme(isLight) {
    document.body.classList.toggle(lightTheme, isLight);

    // Update bulb icon
    setIconClass();

    // Update card visuals
    for (const container of cardContainerArray) {
      if (isLight) {
        summaryLight(container);
      } else {
        summaryDark(container);
      }
    }

    // Update skill icons
    setSkillIconsByTheme();

    // Persist
    localStorage.setItem("userSelectedTheme", getCurrentTheme());
    localStorage.setItem("userSelectedThemeIcon", getCurrentIcon());
  }

  // === Restore on load from localStorage (if any) ===
  function restoreFromStorage() {
    const saved = localStorage.getItem("userSelectedTheme"); // 'light' | 'dark' | null
    if (saved === "light") {
      document.body.classList.add(lightTheme);
    } else if (saved === "dark") {
      document.body.classList.remove(lightTheme);
    }
    // Sync icon + skill icons + card visuals once
    setIconClass();
    for (const container of cardContainerArray) {
      if (getCurrentTheme() === "light") {
        summaryLight(container);
      } else {
        summaryDark(container);
      }
    }
    setSkillIconsByTheme();
  }

  // === Click handler for the bulb ===
  if (icon) {
    icon.addEventListener("click", function () {
      const willBeLight = !document.body.classList.contains(lightTheme);
      applyTheme(willBeLight);
    });
  }

  // === Run on load & page restore ===
  window.addEventListener("DOMContentLoaded", () => {
    // Let any early theme scripts run first, then sync
    setTimeout(() => {
      restoreFromStorage();
      setSkillIconsByTheme();
    }, 0);
  });
  window.addEventListener("pageshow", () => {
    // bfcache restore (mobile Safari/Chrome) can skip DOMContentLoaded
    setSkillIconsByTheme();
    setIconClass();
  });

  // === Keep icons in sync if any script flips body class later ===
  new MutationObserver(() => {
    setSkillIconsByTheme();
    setIconClass();
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();
