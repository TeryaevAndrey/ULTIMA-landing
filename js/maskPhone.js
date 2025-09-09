function maskPhone(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value) {
      e.target.value = "";
      return;
    }

    if (value.startsWith("7")) {
      value = value.substring(1);
    }
    if (value.startsWith("8")) {
      value = value.substring(1);
    }

    let formatted = "+7";

    if (value.length > 0) {
      formatted += " (" + value.substring(0, 3);
    }
    if (value.length >= 4) {
      formatted += ") " + value.substring(3, 6);
    }
    if (value.length >= 7) {
      formatted += "-" + value.substring(6, 8);
    }
    if (value.length >= 9) {
      formatted += "-" + value.substring(8, 10);
    }

    e.target.value = formatted;
  });

  input.addEventListener("keydown", (e) => {
    if (/[^\d\+\-\(\)\s]/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  });
}

document.querySelectorAll('input[type="tel"]').forEach((input) => {
  maskPhone(input);
});
