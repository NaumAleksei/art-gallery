const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Статика для папки public (картинки, стили, скрипты)
app.use('/public', express.static(path.join(__dirname, 'public')));

// 2. Статика для корня (чтобы login.html был доступен напрямую)
app.use(express.static(__dirname));

// 3. Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. Явный маршрут для страницы входа (на всякий случай)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 5. Запуск сервера (ТОЛЬКО ОДИН РАЗ)
app.listen(PORT, () => {
    console.log(`
    🚀 Сервер успешно запущен!
    🏠 Главная: http://localhost:${PORT}
    🔑 Вход:    http://localhost:${PORT}/login.html
    `);
});