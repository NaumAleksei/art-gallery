const upperPaintings = [
    { id: 1, title: "Пески Сахары", category: "Акрил", price: "45 000 ₽", image: "public/images/1.jpg", likes: 12 },
    { id: 2, title: "Белое безмолвие", category: "Гипс", price: "38 000 ₽", image: "public/images/2.jpg", likes: 15 },
    { id: 3, title: "Горный воздух", category: "Гипс", price: "38 000 ₽", image: "public/images/3.jpg", likes: 15 },
    { id: 4, title: "Морская пена", category: "Гипс", price: "38 000 ₽", image: "public/images/4.jpg", likes: 15 },
    { id: 5, title: "Снежное утро", category: "Гипс", price: "38 000 ₽", image: "public/images/5.jpg", likes: 15 },
    { id: 6, title: "Облака", category: "Гипс", price: "38 000 ₽", image: "public/images/6.jpg", likes: 15 }
];

const lowerPaintings = [
    { id: 7, title: "Золотой рассвет", category: "Поталь", price: "52 000 ₽", image: "public/images/7.jpg", likes: 8 },
    { id: 8, title: "Фактурный этюд", category: "Паста", price: "41 000 ₽", image: "public/images/8.jpg", likes: 24 },
    { id: 9, title: "Осенний лес", category: "Паста", price: "41 000 ₽", image: "public/images/9.jpg", likes: 24 },
    { id: 10, title: "Полночь", category: "Паста", price: "41 000 ₽", image: "public/images/10.jpg", likes: 24 },
    { id: 11, title: "Золото инков", category: "Паста", price: "41 000 ₽", image: "public/images/11.jpg", likes: 24 },
    { id: 12, title: "Сумерки", category: "Паста", price: "41 000 ₽", image: "public/images/12.jpg", likes: 24 },
    { id: 13, title: "Рассвет", category: "Паста", price: "41 000 ₽", image: "public/images/13.jpg", likes: 24 }
];

const createCardHTML = (art) => `
    <article class="art-card">
        <div class="art-image"><img src="${art.image}" alt="${art.title}"></div>
        <div class="art-info">
            <div class="art-actions">
                <button class="action-btn like-btn"><i class="far fa-heart"></i> <span class="like-count">${art.likes}</span></button>
                <button class="action-btn collect-btn"><i class="fas fa-folder-plus"></i></button>
                <div class="spacer"></div>
                <button class="action-btn add-to-cart-btn"><i class="fas fa-shopping-bag"></i></button>
            </div>
            <div class="art-details">
                <p class="category">${art.category}</p>
                <h3>"${art.title}"</h3>
                <p class="price">${art.price}</p>
            </div>
        </div>
    </article>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const track1 = document.getElementById('track-1');
    const track2 = document.getElementById('track-2');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const userBtn = document.querySelector('.user-login');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total-price');
    const cartCountBadge = document.querySelector('.cart-count');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider .dot');
    let currentSlide = 0;
    let sliderInterval;

    const showSlide = (index) => {
        // Убираем active у всех
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Добавляем active нужному
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let index = (currentSlide + 1) % slides.length; // Зацикливание
        showSlide(index);
    };

    const startSlider = () => {
        sliderInterval = setInterval(nextSlide, 5000); // Переключение каждые 5 секунд
    };

    const stopSlider = () => {
        clearInterval(sliderInterval);
    };

    document.addEventListener('click', (e) => {
    if (e.target.classList.contains('book-btn')) {
        const serviceName = e.target.closest('.service-info').querySelector('h3').innerText;
        const message = `Здравствуйте! Хочу забронировать услугу: "${serviceName}"`;
        const telegramUrl = `https://t.me/Mari_naumova_art?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    }
});

    // Клик по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopSlider(); // Останавливаем автопереключение при клике
            showSlide(parseInt(dot.dataset.slide));
            startSlider(); // Запускаем снова
        });
    });

    // Запуск
    if (slides.length > 0) {
        startSlider();
    }

    // Состояние
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // --- ЛОГИКА ПОЛЬЗОВАТЕЛЯ ---
    if (currentUser && userBtn) {
        userBtn.querySelector('span').innerText = currentUser.name;
        userBtn.href = "#";
        userBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm(`${currentUser.name}, вы хотите выйти?`)) {
                localStorage.removeItem('currentUser');
                location.reload();
            }
        });
    }
// --- ЛОГИКА КОПИРОВАНИЯ EMAIL ---
const emailBtn = document.querySelector('.copy-email');

if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем переход по ссылке
        
        const email = emailBtn.getAttribute('data-email');
        const textSpan = emailBtn.querySelector('.email-text');
        const originalText = textSpan.innerText;

        // Копирование в буфер
        navigator.clipboard.writeText(email).then(() => {
            // Визуальный отклик
            textSpan.innerText = 'Скопировано!';
            emailBtn.style.borderColor = 'var(--accent-color)';
            emailBtn.style.background = 'var(--beige-light)';

            // Возвращаем текст обратно через 2 секунды
            setTimeout(() => {
                textSpan.innerText = originalText;
                emailBtn.style.borderColor = '';
                emailBtn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
        });
    });
}
    // --- РЕНДЕР КАРТОЧЕК ---
    const renderAll = () => {
        if (!track1 || !track2) return;
        track1.innerHTML = [...upperPaintings, ...upperPaintings].map(createCardHTML).join('');
        track2.innerHTML = [...lowerPaintings, ...lowerPaintings].map(createCardHTML).join('');
    };
    renderAll();

    // --- ОБНОВЛЕНИЕ КОРЗИНЫ ---
    const updateCartUI = () => {
        localStorage.setItem('cartData', JSON.stringify(cart));
        if (cartCountBadge) cartCountBadge.innerText = cart.length;

        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">В корзине пока пусто</p>';
            cartTotalDisplay.innerText = '0 ₽';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map((item, index) => {
            const priceNum = parseInt(item.price.replace(/\s/g, '').replace('₽', ''));
            total += priceNum;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.price}</p>
                        <button class="remove-item" onclick="removeFromCart(${index})">Удалить</button>
                    </div>
                </div>
            `;
        }).join('');
        if (cartTotalDisplay) cartTotalDisplay.innerText = total.toLocaleString() + ' ₽';
    };

    // Глобальная функция удаления
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    // --- АНИМАЦИЯ ТРЕКОВ ---
    let pos1 = 0, pos2 = -1000;
    let speed1 = -0.5, speed2 = 0.5;
    let isPaused1 = false, isPaused2 = false;

    function animate() {
        if (!isPaused1 && track1) {
            pos1 += speed1;
            if (Math.abs(pos1) >= track1.scrollWidth / 2) pos1 = 0;
            track1.style.transform = `translateX(${pos1}px)`;
        }
        if (!isPaused2 && track2) {
            pos2 += speed2;
            if (pos2 >= 0) pos2 = -track2.scrollWidth / 2;
            track2.style.transform = `translateX(${pos2}px)`;
        }
        requestAnimationFrame(animate);
    }
    animate();

    // --- ОБРАБОТЧИК КЛИКОВ (Делегирование) ---
    document.addEventListener('click', (e) => {
        // 1. Лайтбокс
        if (e.target.tagName === 'IMG' && e.target.closest('.art-image')) {
            lightboxImg.src = e.target.src;
            lightboxCaption.innerText = e.target.alt;
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
            return;
        }

        // 2. Добавление в корзину
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            const card = addBtn.closest('.art-card');
            const title = card.querySelector('h3').innerText.replace(/"/g, '');
            const allPaintings = [...upperPaintings, ...lowerPaintings];
            const artData = allPaintings.find(p => p.title === title);

            if (artData) {
                cart.push(artData);
                updateCartUI();
                addBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => addBtn.innerHTML = '<i class="fas fa-shopping-bag"></i>', 1000);
            }
            return;
        }

        // 3. Лайки
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            const icon = likeBtn.querySelector('i');
            const countSpan = likeBtn.querySelector('.like-count');
            let likes = parseInt(countSpan.innerText);
            const isLiked = icon.classList.contains('far');
            icon.className = isLiked ? 'fas fa-heart' : 'far fa-heart';
            icon.style.color = isLiked ? '#e74c3c' : '';
            countSpan.innerText = isLiked ? likes + 1 : likes - 1;
        }
    });

    // --- УПРАВЛЕНИЕ КОРЗИНОЙ (Открытие/Закрытие) ---
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.onclick = (e) => {
            e.preventDefault();
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
        };
    }

    const closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
        closeCartBtn.onclick = () => {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
        };
    }

    if (cartOverlay) {
        cartOverlay.onclick = () => {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
        };
    }

    if (lightbox) {
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
        });
    }

    // --- DRAG-N-DROP ---
    const setupDrag = (track, isFirst) => {
        if (!track) return;
        let startX, mouseDown = false;
        track.addEventListener('mousedown', (e) => {
            mouseDown = true;
            if (isFirst) isPaused1 = true; else isPaused2 = true;
            startX = e.pageX - track.offsetLeft;
        });
        window.addEventListener('mousemove', (e) => {
            if (!mouseDown) return;
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 0.1;
            if (isFirst) pos1 += walk; else pos2 += walk;
            startX = x;
        });
        window.addEventListener('mouseup', () => {
            mouseDown = false;
            if (isFirst) isPaused1 = false; else isPaused2 = false;
        });
    };
    setupDrag(track1, true);
    setupDrag(track2, false);

    // Инициализация интерфейса корзины
    updateCartUI();
const checkoutBtn = document.getElementById('checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Ваша корзина пуста");
            return;
        }

        // 1. Формируем список товаров
        const itemList = cart.map(item => `- "${item.title}" (${item.price})`).join('%0A'); // %0A - это перенос строки
        
        // 2. Считаем итог
        const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\s/g, '')), 0);
        
        // 3. Твой ник в Telegram (БЕЗ @)
        const telegramUsername = "Mari_naumova_art"; 
        
        // 4. Генерируем ссылку
        const message = `Здравствуйте! Хочу заказать картины:%0A${itemList}%0A%0AИтого: ${total.toLocaleString()} ₽`;
        const whatsappUrl = `https://t.me/${telegramUsername}?text=${message}`;

        // 5. Переход
        window.open(whatsappUrl, '_blank');
        
        // Очистка корзины после заказа (опционально)
        // cart = [];
        // updateCartUI();
    });
}

});