window.addEventListener("load", () => {
  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");
  if (!dmGsapCards.length) return;

  const header = document.querySelector(".services__navbar");
  const headerHeight = header.clientHeight;
  const topStep = window.innerWidth < 768 ? 10 : 20;
  const finalScales = [0.9, 0.93, 0.96, 1]; // конечные масштабы карточек

  dmGsapCards.forEach((card, index) => {
    card.style.willChange = "transform";
    const topValue = headerHeight + topStep * index;
    gsap.set(card, { position: "sticky", top: topValue + "px" });

    const nextCard = dmGsapCards[index + 1];
    if (nextCard) {
      // Определяем диапазон скролла следующей карточки
      const startOffset = "top+=70% bottom"; // когда 70% следующей карточки видны
      const endOffset = "top top"; // когда верх следующей карточки достигнет верха экрана

      gsap.fromTo(
        card,
        { scale: 1 },
        {
          scale: finalScales[index],
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: nextCard,
            start: startOffset,
            end: endOffset,
            scrub: true, // плавная анимация
          },
        }
      );
    }
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh(true);
  });
});

window.addEventListener("load", () => {
  gsap.from(".hero__content", {
    y: 70,
    opacity: 0,
    duration: 1.35,
    delay: 0.8,
    ease: "power2.out",
  });

  gsap.from(".header", {
    y: -150,
    opacity: 0,
    duration: 1.35,
    ease: "power2.out",
  });
});

function scrollToCard(index) {
  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");
  const target = dmGsapCards[index];

  if (!target) return;

  // Находим ScrollTrigger текущей карточки
  const trigger = ScrollTrigger.getById(`card-${index}`);

  if (trigger) {
    gsap.to(window, {
      duration: 0.05,
      ease: "power2.out",
      scrollTo: {
        y: trigger.start, // точная стартовая позиция ScrollTrigger
        autoKill: false,
      },
      onUpdate: () => ScrollTrigger.update(),
    });
  } else {
    // fallback: прокрутка по позиции элемента
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    gsap.to(window, {
      duration: 0.1,
      ease: "power2.out",
      scrollTo: targetY,
      onUpdate: () => ScrollTrigger.update(),
    });
  }
}
