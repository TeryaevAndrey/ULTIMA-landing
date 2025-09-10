window.addEventListener("load", () => {
  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");
  if (!dmGsapCards.length) return;

  const header = document.querySelector(".services__navbar");
  const headerHeight = header.clientHeight;
  const topStep = window.innerWidth < 768 ? 10 : 20;
  const finalScales =
    window.innerWidth < 768 ? [0.95, 0.97, 0.985, 1] : [0.9, 0.93, 0.96, 1];
  const isMobile = window.innerWidth < 768;

  dmGsapCards.forEach((card, index) => {
    card.style.willChange = "transform";
    const topValue = headerHeight + topStep * index;
    gsap.set(card, {
      position: "sticky",
      top: topValue + "px",
      force3D: true,
      z: 0,
    });

    const nextCard = dmGsapCards[index + 1];
    if (nextCard) {
      // Определяем диапазон скролла следующей карточки
      const startOffset = isMobile ? "top+=50% bottom" : "top+=70% bottom";
      const endOffset = "top top";

      gsap.fromTo(
        card,
        { scale: 1 },
        {
          scale: finalScales[index],
          transformOrigin: "top center",
          force3D: true,
          z: 0,
          scrollTrigger: {
            trigger: nextCard,
            start: startOffset,
            end: endOffset,
            scrub: isMobile ? 0.5 : 1, // плавная анимация
            id: `card-${index}`,
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

  const trigger = ScrollTrigger.getById(`card-${index}`);

  if (trigger) {
    gsap.to(window, {
      duration: 0.05,
      ease: "power2.out",
      scrollTo: {
        y:
          trigger.start -
          (window.innerWidth <= 768
            ? window.innerHeight * 0.45
            : window.innerHeight * 0.2), 
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
