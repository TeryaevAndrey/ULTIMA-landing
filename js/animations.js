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

  if (!dmGsapCards.length) {
    console.warn("Элементы .dm-gsap-cards не найдены");
    return;
  }

  const getStart = () => {
    if (window.innerWidth <= 768) return "7.5%";
    if (window.innerWidth > 1024 && window.innerHeight <= 768) return "8.5%";
    return "-4%";
  };

  const getCardsOffset = (index) => {
    if (window.innerWidth <= 768) {
      return -100 * (index + 1);
    }

    if (window.innerHeight <= 768) {
      return -30 * (index + 1);
    }

    return -130 * (index + 1);
  };

  dmGsapCards.forEach((dmElement, index) => {
    const scaleValue = 1 - 0.02;

    gsap.to(dmElement, {
      scrollTrigger: {
        trigger: dmElement,
        endTrigger: ".dm-gsap-cards-end",
        start: `0%+=${getCardsOffset(index)}px ${getStart()}`,
        end: "0% -15%",
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
            gsap.to(dmElement, { scale: 1, duration: 0.5 });
          },
        },
      });
    }
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  ScrollTrigger.refresh();
});

function scrollToCard(index) {
  const target = document.querySelectorAll(".dm-gsap-cards")[index];

  if (target) {
    gsap.to(".services__list", {
      duration: 1,
      ease: "power2.out",
      scrollTo: {
        y: target, // именно DOM-элемент
      },
    });
  }
}
