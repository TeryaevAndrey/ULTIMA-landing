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

  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");
  if (!dmGsapCards.length) return;

  const getStart = () => {
    const w = window.innerWidth, h = window.innerHeight;
    if (w <= 768) return "20%";
    if (w < 1024) return "14%";
    if (w > 1024 && h <= 768) return "8.5%";
    return "6%";
  };

  const getCardsOffset = (i) => {
    const w = window.innerWidth;
    if (w <= 768) return -20 * (i + 1);
    if (w < 1024) return -18 * (i + 1);
    return -30 * (i + 1);
  };

  const scaleStep = -0.02;
  dmGsapCards.forEach((el) => gsap.set(el, { scale: 1 }));

  dmGsapCards.forEach((dmElement, i) => {
    gsap.to(dmElement, {
      scrollTrigger: {
        id: `card-${i}`,
        trigger: dmElement,
        endTrigger: ".dm-gsap-cards-end",
        start: `0%+=${getCardsOffset(i)}px ${getStart()}`,
        end: "0% -15%",
        pin: true,
        scrub: true,
      },
    });

    if (i > 0) {
      gsap.to(dmGsapCards[i - 1], {
        scale: 1 + scaleStep,
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

  window.addEventListener("resize", ScrollTrigger.refresh);
  ScrollTrigger.refresh();
});

function scrollToCard(index) {
  const dmGsapCards = gsap.utils.toArray(".dm-gsap-cards");
  const target = dmGsapCards[index];
  if (!target) return;

  const trigger = ScrollTrigger.getById(`card-${index}`);
  const scrollY = trigger ? trigger.start : target.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    duration: trigger ? 0.05 : 0.1,
    ease: "power2.out",
    scrollTo: scrollY,
    onUpdate: ScrollTrigger.update,
  });
}
