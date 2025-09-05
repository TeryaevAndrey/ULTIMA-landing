const form = document.querySelector(".callback-form");
const formButton = form.querySelector(".callback-form__button");

const TOKEN = 'Тут ваш токен';
const CHAT_ID = 'Тут chat_id';

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let loading = true;
  formButton.textContent = "Загрузка...";

  const formData = new FormData(form);
  const name = formData.get("name");
  const tel = formData.get("tel");
  const email = formData.get("email");

  // Ваши данные бота
  const botToken = "ВАШ_BOT_TOKEN";
  const chatId = "ВАШ_CHAT_ID";

  // Сообщение для Telegram
  const message = `
Имя: ${name}
Телефон: ${tel}
Почта/Telegram: ${email}
    `;

  try {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
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
    loading = false;
    formButton.textContent = "Связаться с нами";
  }
});

function scrollToBlock(e, id) {
  e.preventDefault(); 

  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY;

  const offset = 300;
  window.scrollTo({
    top: y - offset,
    behavior: "smooth",
  });

  history.pushState(null, "", `#${id}`);
}