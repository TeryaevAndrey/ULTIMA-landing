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

window.addEventListener("load", () => {
  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");

  if (!dmGsapCards.length) return;

  const getStart = () => {
    if (window.innerWidth <= 768) return "15%";
    if(window.innerWidth > 768 && window.innerWidth < 1024) return '14%';
    if (window.innerWidth > 1024 && window.innerHeight <= 768) return "8.5%";
    return "6%";
  };

  const getCardsOffset = (index) => {
    if (window.innerWidth <= 768) return -20 * (index + 1);
    if(window.innerWidth > 768 && window.innerWidth < 1024) return -18 * (index + 1);
    return -30 * (index + 1);
  };

  const scaleStep = -0.02; // оставляем твой шаг

  // устанавливаем начальный scale для всех карточек
  dmGsapCards.forEach((el) => gsap.set(el, { scale: 1 }));

  dmGsapCards.forEach((dmElement, index) => {
    gsap.to(dmElement, {
      scrollTrigger: {
        id: `card-${index}`,
        trigger: dmElement,
        endTrigger: ".dm-gsap-cards-end",
        start: `0%+=${getCardsOffset(index)}px ${getStart()}`,
        end: "0% -15%",
        pin: true,
        scrub: true,
      },
    });

    if (index > 0) {
      const prevElement = dmGsapCards[index - 1];

      gsap.to(prevElement, {
        scale: 1 + scaleStep, // оставляем твой вариант
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: dmElement,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    }
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  ScrollTrigger.refresh();
});
