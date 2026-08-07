(() => {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav__links");

  // Solidify nav on scroll
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    nav.classList.remove("is-menu-open");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    links.classList.add("is-open");
    nav.classList.add("is-menu-open");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", closeMenu)
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Pricing tabs
  const tabs = document.querySelectorAll(".pricing__tabs .tab");
  const panels = document.querySelectorAll(".pricing__panels .panel");

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });
      panels.forEach((p) =>
        p.classList.toggle("is-active", p.dataset.panel === target)
      );
    })
  );

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal on scroll
  const revealTargets = document.querySelectorAll(
    ".section__head, .about__content, .about__media, .service, .member, .contact__form, .contact__info, .map, .quote__inner, .pricing__panels, .pricing__tabs, .faq__item"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => io.observe(el));

  // Stagger services within their container
  document.querySelectorAll(".services__grid .service").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
  });
  document.querySelectorAll(".team__grid .member").forEach((el, i) => {
    el.style.transitionDelay = `${i * 100}ms`;
  });

  // ============================================================
  // PROCESS · 3D TREATMENT PLAN
  // ============================================================
  const viewer = document.querySelector(".process__viewer");
  if (viewer) {
    const stageBtns = viewer.querySelectorAll(".process__stage");
    const descs = viewer.querySelectorAll(".process__desc");
    const total = stageBtns.length;
    const progressFill = viewer.querySelector(".process__progress-fill");
    const prevBtn = viewer.querySelector('[data-ctrl="prev"]');
    const nextBtn = viewer.querySelector('[data-ctrl="next"]');
    const hudStatus = viewer.querySelector("[data-hud-status]");
    const scene = viewer.querySelector(".process__scene");
    const viewport = viewer.querySelector(".process__viewport");

    const statusPerStage = [
      "DIAGNOSTIC MODE",
      "PLANNING MODE",
      "PREP MODE",
      "TEMP CROWN",
      "FINAL CROWN",
    ];

    let current = 0;
    let autoTimer = null;
    let userInteracted = false;

    const setStage = (idx) => {
      current = ((idx % total) + total) % total;
      viewer.setAttribute("data-current", String(current));

      stageBtns.forEach((btn, i) => {
        const active = i === current;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
      });

      descs.forEach((d, i) => d.classList.toggle("is-active", i === current));

      if (progressFill) {
        progressFill.style.width = `${((current + 1) / total) * 100}%`;
      }
      if (hudStatus) hudStatus.textContent = statusPerStage[current];
    };

    stageBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        userInteracted = true;
        stopAuto();
        setStage(Number(btn.dataset.stage));
      })
    );

    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        userInteracted = true;
        stopAuto();
        setStage(current - 1);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        userInteracted = true;
        stopAuto();
        setStage(current + 1);
      });

    document.addEventListener("keydown", (e) => {
      if (!isVisible(viewer)) return;
      if (e.key === "ArrowRight") {
        userInteracted = true;
        stopAuto();
        setStage(current + 1);
      } else if (e.key === "ArrowLeft") {
        userInteracted = true;
        stopAuto();
        setStage(current - 1);
      }
    });

    // Mouse parallax tilt on the viewport (subtle 3D feel)
    if (viewport && scene && matchMedia("(pointer: fine)").matches) {
      viewport.addEventListener("mousemove", (e) => {
        const rect = viewport.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        scene.style.transform = `perspective(1400px) rotateX(${(y * -8).toFixed(
          2
        )}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
      });
      viewport.addEventListener("mouseleave", () => {
        scene.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
      });
    }

    // Auto-advance when section becomes visible & user hasn't taken over
    const startAuto = () => {
      if (autoTimer || userInteracted) return;
      autoTimer = setInterval(() => setStage(current + 1), 4500);
    };
    const stopAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    const visIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAuto();
          else stopAuto();
        });
      },
      { threshold: 0.35 }
    );
    visIO.observe(viewer);

    setStage(0);
  }

  function isVisible(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.9 && r.bottom > 0;
  }
})();
