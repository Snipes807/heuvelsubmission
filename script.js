(() => {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const heroBg = document.querySelector(".hero-bg");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Solid header once the user scrolls past the top of the hero
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);

    // Subtle parallax on the hero image
    if (heroBg && !reduceMotion && y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  const setNav = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setNav(!document.body.classList.contains("nav-open")));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setNav(false));

  // Reveal sections as they enter the viewport
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
