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
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    links.classList.toggle("is-open", !open);
    document.body.style.overflow = !open ? "hidden" : "";
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );

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
})();
