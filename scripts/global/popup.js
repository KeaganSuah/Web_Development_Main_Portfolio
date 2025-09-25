/* popup.js — modal open/close that preserves scroll position (no animated jump) */
(function () {
  "use strict";

  const modal = document.querySelector(".modal");
  const overlay = document.getElementById("overlay");
  const closeBtn = modal?.querySelector(".close_button");
  const backLink = modal?.querySelector(".back_link");

  // State for scroll lock/restore
  const scrollState = {
    y: 0,
    prevHtmlScrollBehavior: "",
    locked: false,
  };

  // --------- Lock / Unlock scroll (no layout jump) ----------
  function lockScroll() {
    if (scrollState.locked) return;
    scrollState.y = window.scrollY || document.documentElement.scrollTop || 0;
    // Remember inline style (stylesheet value will still be there)
    scrollState.prevHtmlScrollBehavior =
      document.documentElement.style.scrollBehavior || "";
    // Freeze body at current position (inline style beats class rule)
    document.body.style.top = `-${scrollState.y}px`;
    document.body.classList.add("disable-scroll");
    scrollState.locked = true;
  }

  function unlockScroll() {
    if (!scrollState.locked) return;
    // Temporarily disable smooth scroll so restore is instant
    document.documentElement.style.scrollBehavior = "auto";

    document.body.classList.remove("disable-scroll");
    document.body.style.top = ""; // remove inline top
    window.scrollTo(0, scrollState.y);

    // Restore whatever inline value was there before (usually "")
    document.documentElement.style.scrollBehavior =
      scrollState.prevHtmlScrollBehavior;

    scrollState.locked = false;
  }

  // --------- Fill modal content (keeps your existing HTML structure) ----------
  function renderModalContent(titleText, imgSrc, imgAlt, portfolios) {
    const titleEl = modal.querySelector(".title");
    const imgEl = modal.querySelector(".modal_body figure img");
    const descEl = modal.querySelector(".modal_body .description");
    const techUl = modal.querySelector(".modal_body .technology");
    const skillsUl = modal.querySelector(".modal_body .skills");

    // Clear lists
    techUl.innerHTML = "";
    skillsUl.innerHTML = "";

    // Try to find matching portfolio object by title
    const data =
      portfolios.find((p) => (p.title || "").trim() === titleText.trim()) ||
      null;

    titleEl.textContent = titleText;
    imgEl.src = imgSrc;
    imgEl.alt = imgAlt || titleText;

    if (data) {
      descEl.textContent = data.description || "";

      (data.technology || []).forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        techUl.appendChild(li);
      });

      (data.skills || []).forEach((s) => {
        const li = document.createElement("li");
        li.textContent = s;
        skillsUl.appendChild(li);
      });

      // Render links block if you want (optional). Example:
      const linksContainer = modal.querySelector(".modal_body .links");
      if (linksContainer) {
        linksContainer.innerHTML = "";
        (data.links || []).forEach((lnk) => {
          const a = document.createElement("a");
          a.href = lnk.link;
          a.innerHTML = lnk.title; // contains icons already
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          linksContainer.appendChild(a);
        });
      }
    } else {
      // Fallback if not found
      descEl.textContent = "";
    }
  }

  // --------- Open / Close modal ----------
  function openModal(modalEl, titleText, imgSrc, imgAlt, portfolios) {
    if (!modalEl) return;
    renderModalContent(titleText, imgSrc, imgAlt, portfolios);
    modalEl.classList.add("active");
    overlay.classList.add("active");
    lockScroll();

    // Accessibility: focus the close button
    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    // Allow CSS transforms to finish, then restore scroll instantly
    // (No need to wait if your transform is instant, but 0ms timeout
    // keeps it safe across browsers)
    setTimeout(unlockScroll, 0);
  }

  // Expose openModal globally since your card code calls it
  window.openModal = openModal;

  // Close handlers
  closeBtn?.addEventListener("click", closeModal);
  backLink?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", (e) => {
    // Click outside to close
    if (e.target === overlay) closeModal();
  });

  // ESC key to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();
