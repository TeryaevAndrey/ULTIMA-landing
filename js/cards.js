const cards = document.querySelectorAll(".card");
const navLinks = document.querySelectorAll(".services__nav");

const cardsTops = [...cards].map((card) => {
  const top = card.getBoundingClientRect().top;

  return top;
});

window.addEventListener("scroll", () => {
  let currentIndex = null;
  const middle = window.innerHeight / 2;

  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom >= middle) {
      currentIndex = i;
    }
  });

  navLinks.forEach((link) => link.classList.remove("active"));

  if (currentIndex !== null && navLinks[currentIndex]) {
    navLinks[currentIndex].classList.add("active");
  }
});
