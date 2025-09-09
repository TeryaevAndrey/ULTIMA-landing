window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
});

function scrollToBlock(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 150,
    behavior: "smooth",
  });
  history.pushState(null, "", `#${id}`);
}

document.querySelectorAll(".form-control input").forEach(input => {
  input.addEventListener("input", () => {
    const errorEl = input.closest(".form-control").querySelector(".form-error");
    if (errorEl) errorEl.textContent = "";
  });
});
