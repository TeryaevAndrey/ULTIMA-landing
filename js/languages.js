const languageButton = document.querySelector(".language-button");
let currentLang = localStorage.getItem("lang") || "en";
let translations = {};

fetch("../assets/translations.json")
  .then((res) => res.json())
  .then((data) => {
    translations = data;
    setLanguage(currentLang);
    updateButtonText();
  });

languageButton.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ru" : "en";
  localStorage.setItem("lang", currentLang);
  setLanguage(currentLang);
  updateButtonText();
});

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = translations[lang][key] || key;
  });
}

function updateButtonText() {
  languageButton.textContent = currentLang === "en" ? "RU" : "EN";
}
