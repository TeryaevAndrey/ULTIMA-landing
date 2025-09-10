window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = 0;
      startAnimations();
    }, 2000);

  } else {
    startAnimations();
  }
});
