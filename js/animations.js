window.addEventListener("load", () => {
  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");

  if (!dmGsapCards.length) return;

  const getStart = () => {
    if (window.innerWidth <= 768) return "138px";
    if (window.innerWidth > 768 && window.innerWidth < 1024) return "14%";
    if (window.innerWidth > 1024 && window.innerHeight <= 768) return "8.5%";
    return "6%";
  };

  const getCardsOffset = (index) => {
    if (window.innerWidth <= 768) return -20 * (index + 1);
    if (window.innerWidth > 768 && window.innerWidth < 1024)
      return -18 * (index + 1);
    return -30 * (index + 1);
  };

  const baseScaleStep = 0.01; // базовый шаг для масштаба

  dmGsapCards.forEach((dmElement, index) => {
    // Добавляем will-change для оптимизации рендеринга
    dmElement.style.willChange = "transform";

    gsap.to(dmElement, {
      scrollTrigger: {
        id: `card-${index}`,
        trigger: dmElement,
        endTrigger: ".dm-gsap-cards-end",
        start: `0%+=${getCardsOffset(index)}px ${getStart()}`,
        end: "0% -15%",
        pin: true,
        scrub: true,
        invalidateOnRefresh: true, // оптимизация для плавности анимации
      },
    });

    // Проверяем, если это не последняя карточка, применяем уменьшение масштаба
    if (index !== dmGsapCards.length - 1) {
      const scaleStep = baseScaleStep * (dmGsapCards.length - 1 - index); // обратный порядок уменьшения масштаба

      gsap.fromTo(
        dmElement,
        { scale: 1 }, // начальный масштаб
        {
          scale: 1 - scaleStep, // конечный масштаб
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: dmElement,
            start: "top+=50% bottom-=20%", // масштаб начинается при наложении
            end: "top+=50% top", // масштаб заканчивается, когда карточка полностью наложилась
            scrub: true,
          },
        }
      );
    }
  });

  // Добавляем обработчик для обновления ScrollTrigger при изменении размера окна
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh(true); // минимизация лишних пересчетов
  });

  // Устанавливаем сглаживание лагов для GSAP
  gsap.ticker.lagSmoothing(1000, 16);

  ScrollTrigger.refresh();
});
