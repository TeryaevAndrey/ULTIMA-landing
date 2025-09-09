window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}


function scrollToBlock(e, id) {
  e.preventDefault();

  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY;

  const offset = 150;
  window.scrollTo({
    top: y - offset,
    behavior: "smooth",
  });

  history.pushState(null, "", `#${id}`);
}

const controls = document.querySelectorAll(".form-control");

controls.forEach((control) => {
  const input = control.querySelector("input");
  const errorEl = control.querySelector(".form-error");

  input.addEventListener("input", () => {
    errorEl.textContent = "";
  });
});
