gsap.registerPlugin(ScrollTrigger);

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

window.addEventListener("load", () => {
  const dmGsapCards = document.querySelectorAll(".card");
  const dmCardsLength = dmGsapCards.length;

  dmGsapCards.forEach((dmElement, index) => {
    const dmCardsOffset = -130 * (index + 1);
    const scaleValue = (100 - dmCardsLength) / 100 + (index + 1) * 0.01; // Incremental scale value

    gsap.to(dmElement, {
      scrollTrigger: {
        trigger: dmElement,
        endTrigger: ".end",
        start: `0%+=${dmCardsOffset}px -4%`,
        end: "0% 15%",
        pin: true,
        scrub: true,
        markers: false,
      },
    });

    if (index < dmGsapCards.length - 1) {
      const nextElement = dmGsapCards[index + 1];
      gsap.to(dmElement, {
        scrollTrigger: {
          trigger: nextElement,
          start: "50% 50%",
          end: "50% 50%",
          markers: false,
          onEnter: () => {
            gsap.to(dmElement, {
              scale: scaleValue,
              duration: 0.5,
              transformOrigin: "top center",
            });
          },
          onLeaveBack: () => {
            gsap.to(dmElement, { opacity: 1, scale: 1, duration: 0.5 });
          },
        },
      });
    }
  });
});
