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
    let errorEl = control.querySelector(".form-error");

    if (errorEl) errorEl.remove();

    if (!input.value.trim()) {
      showError(control, "Поле обязательно для заполнения");
      hasError = true;
    } else if (
      input.name === "tel" &&
      !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(input.value.trim())
    ) {
      showError(control, "Введите корректный телефон");
      hasError = true;
    } else if (input.name === "email" && !input.value.trim()) {
      showError(control, "Введите почту или Telegram");
      hasError = true;
    }

    // вешаем обработчик на ввод (один раз)
    if (!input.dataset.listener) {
      input.addEventListener("input", () => {
        const err = control.querySelector(".form-error");
        if (err) err.remove();
      });
      input.dataset.listener = "true";
    }
  });

  if (hasError) return;

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

function showError(control, message) {
  const errorEl = document.createElement("p");
  errorEl.className = "form-error";
  errorEl.textContent = message;
  control.appendChild(errorEl);
}
