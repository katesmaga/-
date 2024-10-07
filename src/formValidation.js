let creditCardAttempts = 0;
const maxAttempts = 3;

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let firstName = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let organization = document.getElementById('organization').value.trim();
    let creditCard = document.getElementById('creditCard').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();
    let errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('hidden');
    errorMessage.innerHTML = '';

    if (!firstName || !lastName || !organization || !creditCard || !phone || !email) {
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = 'Всі поля повинні бути заповнені';
        return;
    }
    const creditCardRegex = /^\d{16}$/;
    if (!creditCardRegex.test(creditCard)) {
        creditCardAttempts++;
        if (creditCardAttempts >= maxAttempts) {
            errorMessage.classList.remove('hidden');
            errorMessage.innerHTML = 'Ви перевищили кількість спроб введення неправильної кредитної картки';
            return;
        } else {
            errorMessage.classList.remove('hidden');
            errorMessage.innerHTML = `Невірний номер кредитної картки. Залишилось спроб: ${maxAttempts - creditCardAttempts}.`;
            return;
        }
    }
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = 'Ім\'я та прізвище можуть містити лише літери';
        return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = 'Номер телефону повинен містити 10 цифр';
        return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = 'Введіть коректну електронну пошту';
        return;
    }
    alert('Форма успішно надіслана!');
});

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('registrationForm').reset();
    document.getElementById('errorMessage').classList.add('hidden');
    creditCardAttempts = 0;
});

document.getElementById('replaceForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let inputString = document.getElementById('inputString').value;
    let regex = /a\\a/g;
    let newString = inputString.replace(regex, '!');
    alert(`Результат: ${newString}`);
  });
