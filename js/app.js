window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual"; 
}

const form = document.querySelector(".callback-form");
const formButton = form.querySelector(".callback-form__button");

const TOKEN = "Тут ваш токен";
const CHAT_ID = "Тут chat_id";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const controls = form.querySelectorAll(".form-control");
  let hasError = false;

  controls.forEach((control) => {
    const input = control.querySelector("input");
    const errorEl = control.querySelector(".form-error");
    errorEl.textContent = ""; 

    if (!input.value.trim()) {
      errorEl.textContent = "Поле обязательно для заполнения";
      hasError = true;
    } else if (
      input.name === "tel" &&
      !/^\+?\d{7,15}$/.test(input.value.trim())
    ) {
      errorEl.textContent = "Введите корректный телефон";
      hasError = true;
    } else if (input.name === "email" && !input.value.trim()) {
      errorEl.textContent = "Введите почту или Telegram";
      hasError = true;
    }
  });

  if (hasError) return;

  // Если ошибок нет — отправляем форму
  formButton.textContent = "Загрузка...";
  formButton.disabled = true;

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const tel = formData.get("tel").trim();
  const email = formData.get("email").trim();

  const botToken = "ВАШ_BOT_TOKEN";
  const chatId = "ВАШ_CHAT_ID";

  const message = `
Имя: ${name}
Телефон: ${tel}
Почта/Telegram: ${email}
  `;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    if (response.ok) {
      alert("Форма успешно отправлена!");
      form.reset();
    } else {
      alert("Ошибка при отправке формы.");
    }
  } catch (error) {
    console.error(error);
    alert("Произошла ошибка.");
  } finally {
    formButton.textContent = "Связаться с нами";
    formButton.disabled = false;
  }
});

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
