(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveals = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const chips = document.querySelectorAll("[data-chip-cycle] .chip");
  if (chips.length && !prefersReduced) {
    let i = 0;
    setInterval(() => {
      chips.forEach((c) => c.classList.remove("chip--mint"));
      chips[i % chips.length].classList.add("chip--mint");
      i += 1;
    }, 1800);
  }
})();
