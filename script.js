const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});

const card = document.querySelector("#visual-card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (card && !reducedMotion.matches) {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `rotateX(${-y * 5}deg) rotateY(${x * 6}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
