/* portfolio + popup (with optional Links section) */
(function () {
  "use strict";

  /* -------------------- Modal elements -------------------- */
  const modal = document.querySelector(".modal");
  const overlay = document.getElementById("overlay");
  const closeBtn = modal?.querySelector(".close_button");
  const backLink = modal?.querySelector(".back_link");
  const modalBody = modal?.querySelector(".modal_body");

  if (!modal || !overlay || !modalBody) {
    console.warn("[popup] Missing .modal, #overlay, or .modal_body in DOM.");
  }

  /* -------------------- Scroll lock state -------------------- */
  const scrollState = {
    y: 0,
    prevHtmlScrollBehavior: "",
    locked: false,
  };

  function lockScroll() {
    if (scrollState.locked) return;
    scrollState.y = window.scrollY || document.documentElement.scrollTop || 0;

    scrollState.prevHtmlScrollBehavior =
      document.documentElement.style.scrollBehavior || "";

    document.body.style.top = `-${scrollState.y}px`;
    document.body.classList.add("disable-scroll");
    scrollState.locked = true;
  }

  function unlockScroll() {
    if (!scrollState.locked) return;

    document.documentElement.style.scrollBehavior = "auto";
    document.body.classList.remove("disable-scroll");
    document.body.style.top = "";
    window.scrollTo(0, scrollState.y);
    document.documentElement.style.scrollBehavior =
      scrollState.prevHtmlScrollBehavior;

    scrollState.locked = false;
  }

  /* -------------------- Data: portfolios -------------------- */
  const portfolios = [];

  const NS_Roll_Call_System = {
    title: "NS Roll Call System",
    description:
      "Made during my national service. The Roll Call Web is a centralised platform where users can easily upload their attendance, significantly reducing the time required for administrative tasks and data uploads. Servicemen can submit their attendance status through the website, eliminating the need for manual submission via alternative means.",
    alternative: "picture showing NS roll call system project",
    technology: [
      "HTML/CSS",
      "JavaScript",
      "Python",
      "Flask Framework",
      "SQL",
      "AWS (Lightsail, Route53)",
    ],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/NS-Project-Automation",
      },
      {
        title: "<i class='bx bxs-book-content'></i> Testimonial for Project",
        link: "/static/portfolio/portfolio/NS_Testimonial.pdf",
      },
      {
        title: "<i class='bx bxs-book'></i> Report for Project",
        link: "/static/portfolio/portfolio/NS_Report.pdf",
      },
    ],
  };
  portfolios.push(NS_Roll_Call_System);

  const E_Commerce = {
    title: "E-Commerce Hackathon23",
    description:
      "As project leader, I lead the development of KIZEK Wear,a frontend-only e-commerce website dedicated to female sportswear. This project was developed as part of the Hackathon Team KIZEK, where our team secured the first-place position by creating an innovative and visually stunning user interface for a female sportswear marketplace.",
    alternative: "picture showing E commerce hackathon project",
    technology: ["HTML/CSS", "JavaScript", "Python", "Django"],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/Hackathon-E-Commerce",
      },
      {
        title:
          "<i class='bx bxs-book-content'></i> Certificate of Appreciation",
        link: "/static/portfolio/portfolio/Hackathon23.pdf",
      },
    ],
  };
  portfolios.push(E_Commerce);

  const NS_Duty_Planner_System = {
    title: "NS Duty Planner System",
    description:
      "Made during my national service. The automated duty planner program was developed to streamline duty planning processes, reducing planning time from days to seconds. I analysis the duty planning process and devised an algorithm that efficiently schedules duties, ensuring optimal efficiency and accuracy.",
    alternative: "picture showing NS duty planner system project",
    technology: [
      "HTML/CSS",
      "JavaScript",
      "Python",
      "Flask",
      "SQL",
      "AWS (Lightsail, Route53)",
      "Openpyxl",
    ],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/NS-Project-Automation",
      },
      {
        title: "<i class='bx bxs-book-content'></i> Testimonial for Project",
        link: "/static/portfolio/portfolio/NS_Testimonial.pdf",
      },
      {
        title: "<i class='bx bxs-book'></i> Report for Project",
        link: "/static/portfolio/portfolio/NS_Report.pdf",
      },
    ],
  };
  portfolios.push(NS_Duty_Planner_System);

  const Portfolio_Website_V1 = {
    title: "Portfolio Website V1",
    description:
      "Welcome to my portfolio website! This is the first version of the portfolio website that I have made. This is the place where I showcase my skills and expertise as a first-year computer science student passionate about solving real-world problems through innovative projects.",
    alternative:
      "picture showing my first version of portfolio website project",
    technology: ["HTML/CSS", "JavaScript", "GitHub", "Visual Studio Code"],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/portfolio_website_version_1",
      },
    ],
  };
  portfolios.push(Portfolio_Website_V1);

  const Platform_Game = {
    title: "2D Platform Game",
    description:
      "This project is about developing a 2D platform game reminiscent of Mario, featuring custom graphics and engaging mechanics. It introduces enhancements like jump acceleration and sound effects, offering diverse levels for players. Despite challenges like implementing the translate function, the project provided valuable learning experiences in programming and design, resulting in a successful blend of technical proficiency and creativity.",
    alternative: "picture showing my 2d platform game project",
    technology: ["JavaScript", "p5.js", "HTML/CSS"],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/2D_Platform_Game",
      },
    ],
  };
  portfolios.push(Platform_Game);

  const poetry_assistant = {
    title: "Poetry Assistant",
    description:
      "Developed a Poetry Assistant to simplify the creative process for poets and lyricists. Leveraging advanced JavaScript algorithms and data structures, this tool provides single (masculine) and assonance rhyme suggestions. The assistant focuses on delivering accurate rhyme results with efficient syllable sorting and ranking, ensuring users' intuitive and smooth experience.",
    alternative: "picture showing my poetry assistant",
    technology: ["JavaScript", "Node.js"],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/Poetry_Assistant_Algorithm",
      },
      {
        title: '<i class="bx bxl-youtube"></i> YouTube',
        link: "https://www.youtube.com/watch?v=KbNYfMFjr6U",
      },
    ],
  };
  portfolios.push(poetry_assistant);

  const Themepark_Website = {
    title: "Themepark Website",
    description:
      "Led the development of a user-friendly, multi-page website for a theme park, focused on enhancing user experience and providing essential information. The project included a main page with events and promotions, an attractions page detailing top tips and maps, and a ticketing page for pricing and bookings. We ensured cohesive design, smooth navigation, and responsive layouts across all pages.",
    alternative: "picture showing my themepark website",
    technology: ["HTML/CSS", "JavaScript"],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/Themepark_Website",
      },
    ],
  };
  portfolios.push(Themepark_Website);

  const dsta_hackathon24 = {
    title: "DSTA Hackathon24",
    description:
      "Participated in a collaborative hackathon where my team developed innovative solutions for tasks in natural language processing (NLP), vision-language models (VLM), and automatic speech recognition (ASR). Leveraged the Vertex AI Workbench with full GPU support for efficient development in a JupyterLab environment.",
    alternative: "picture showing my DSTA hackathon24",
    technology: ["Python", "Pytorch", "TensorFlow"],
    links: [
      {
        title: '<i class="bx bxl-github"></i> Github',
        link: "https://github.com/KeaganSuah/Inventory-management-and-billing-system",
      },
      {
        title:
          "<i class='bx bxs-book-content'></i> Certificate of Participation",
        link: "/static/portfolio/portfolio/DSTA hackathon24.pdf",
      },
    ],
  };
  portfolios.push(dsta_hackathon24);

  // Expose for debugging if needed
  window.portfolios = portfolios;

  /* -------------------- Helpers -------------------- */
  function findPortfolioByTitle(titleText) {
    const t = (titleText || "").trim().toLowerCase();
    return portfolios.find((p) => (p.title || "").trim().toLowerCase() === t);
  }

  // Create (if needed) and return the Links segment UL
  function ensureLinksSegment() {
    let seg = modal.querySelector(".links_segment");
    if (!seg) {
      seg = document.createElement("div");
      seg.className = "segment links_segment";

      const h3 = document.createElement("h3");
      h3.textContent = "Links";

      // Make it a UL so it can share the pill styles
      const ul = document.createElement("ul");
      ul.className = "links";

      seg.appendChild(h3);
      seg.appendChild(ul);
      modalBody.appendChild(seg);
    }
    return seg.querySelector("ul.links"); // return the UL
  }

  /* -------------------- Render modal content -------------------- */
  function renderModalContent(titleText, imgSrc, imgAlt, list) {
    const titleEl = modal.querySelector(".title");
    const imgEl = modal.querySelector(".modal_body figure img");
    const descEl = modal.querySelector(".modal_body .description");
    const techUl = modal.querySelector(".modal_body .technology");

    // Safety
    if (!titleEl || !imgEl || !descEl || !techUl) return;

    // Clear lists
    techUl.innerHTML = "";

    // Title & image
    titleEl.textContent = titleText || "";
    imgEl.src = imgSrc || "";
    imgEl.alt = imgAlt || titleText || "";

    // Data lookup
    const data =
      (list || []).find(
        (p) => (p.title || "").trim() === (titleText || "").trim()
      ) ||
      findPortfolioByTitle(titleText) ||
      null;

    if (data) {
      descEl.textContent = data.description || "";

      (data.technology || []).forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        techUl.appendChild(li);
      });

      // --- Links (optional) -> build as UL with pill LI items ---
      const linksUl = ensureLinksSegment(); // <ul class="links">
      const linksSeg = linksUl?.parentElement; // .segment container

      if (linksUl && linksSeg) {
        linksUl.innerHTML = "";
        const hasLinks = Array.isArray(data.links) && data.links.length > 0;

        if (hasLinks) {
          data.links.forEach((lnk) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = lnk.link;
            a.innerHTML = lnk.title; // supports icon HTML
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            li.appendChild(a);
            linksUl.appendChild(li);
          });
          linksSeg.style.display = ""; // show
        } else {
          linksSeg.style.display = "none"; // hide whole segment
        }
      }
      // -----------------------------------------------------------
    } else {
      // No data found for this title
      descEl.textContent = "";
      // Hide links segment if present
      const linksSeg = modal.querySelector(".links_segment");
      if (linksSeg) linksSeg.style.display = "none";
    }
  }

  /* -------------------- Open / Close modal -------------------- */
  function openModal(modalEl, titleText, imgSrc, imgAlt, list) {
    if (!modalEl) return;
    renderModalContent(titleText, imgSrc, imgAlt, list);
    modalEl.classList.add("active");
    overlay.classList.add("active");
    lockScroll();
    // Focus close for a11y
    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    setTimeout(unlockScroll, 0);
  }

  // Expose since your card code may call it
  window.openModal = openModal;

  // Close interactions
  closeBtn?.addEventListener("click", closeModal);
  backLink?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  /* -------------------- Card wiring -------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".portfolio_card");

    // Keep your glow + theme hooks if defined globally
    try {
      if (typeof gridGlows === "function" && cards.length) {
        gridGlows(cards);
      }
      if (Array.isArray(window.cardContainerArray)) {
        window.cardContainerArray.push(cards);
      }
    } catch (err) {
      console.warn("[popup] Optional hooks failed:", err);
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.querySelector(".card_title");
        const img = card.querySelector("img");
        openModal(
          modal,
          title?.textContent || "",
          img?.src || "",
          img?.alt || "",
          portfolios
        );
      });
    });
  });
})();
