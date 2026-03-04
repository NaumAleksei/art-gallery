document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMsg = document.getElementById('auth-error');

    // Переключение вкладок
    const switchTab = (mode) => {
        errorMsg.style.display = 'none';
        if (mode === 'reg') {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        } else {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    };

    tabLogin.onclick = () => switchTab('login');
    tabRegister.onclick = () => switchTab('reg');

    // РЕГИСТРАЦИЯ
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        const user = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            pass: document.getElementById('reg-pass').value
        };

        // Проверяем, есть ли уже такой пользователь
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === user.email)) {
            errorMsg.innerText = "Пользователь с таким email уже существует";
            errorMsg.style.display = 'block';
            return;
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Регистрация успешна! Теперь войдите.");
        switchTab('login');
    };

    // ВХОД
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.pass === pass);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html'; // Уходим на главную
        } else {
            errorMsg.innerText = "Неверный email или пароль";
            errorMsg.style.display = 'block';
        }
    };
});