document.addEventListener('DOMContentLoaded', () => {
    // 1. Данные для картин
    const upperPaintings = [
        { id: 1, title: "Ом", category: "Акрил, паста", price: "4500 ₽", image: "public/images/1.jpg", size: "50x70", likes: 12 },
        { id: 2, title: "Мандала", category: "Акрил, паста", price: "4500 ₽", image: "public/images/2.jpg", size: "40x40", likes: 21 },
        { id: 3, title: "Сквозь свет", category: "Акрил, паста", price: "4500 ₽", image: "public/images/3.jpg", size: "60x80", likes: 15 },
        { id: 4, title: "Осень", category: "Акрил, паста", price: "5500 ₽", image: "public/images/4.jpg", size: "50x60", likes: 19 },
        { id: 5, title: "Намасте", category: "Акрил, паста", price: "3500 ₽", image: "public/images/namaste.jpg", size: "30x40", likes: 16 },
        { id: 6, title: "Сны", category: "Акрил, паста", price: "3500 ₽", image: "public/images/dreams.jpg", size: "40x50", likes: 27 },
        { id: 7, title: "Цветущий Будда", category: "Акрил, паста", price: "6500 ₽", image: "public/images/6.jpg", size: "70x90", likes: 10 }
    ];

    const lowerPaintings = [
        { id: 8, title: "Воздух", category: "Акрил, паста", price: "3500 ₽", image: "public/images/7.jpg", size: "40x40", likes: 8 },
        { id: 9, title: "Прилив", category: "Акрил, паста", price: "3500 ₽", image: "public/images/8.jpg", size: "50x50", likes: 9 },
        { id: 10, title: "Мечты о море", category: "Акрил, паста", price: "7000 ₽", image: "public/images/9.jpg", size: "80x100", likes: 11 },
        { id: 11, title: "Горный мираж", category: "Акрил, паста", price: "7000 ₽", image: "public/images/10.jpg", size: "70x90", likes: 30 },
        { id: 12, title: "Океан", category: "Акрил, паста", price: "5500 ₽", image: "public/images/11.jpg", size: "60x80", likes: 20 },
        { id: 13, title: "Грация", category: "Акрил, паста", price: "4000 ₽", image: "public/images/12.jpg", size: "40x60", likes: 4 },
        { id: 14, title: "Хлопок", category: "Акрил, паста", price: "3000 ₽", image: "public/images/13.jpg", size: "30x30", likes: 14 }
    ];

    // --- Логика верхнего баннера ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide'); // Убедитесь, что у вас в HTML есть этот класс
    
    function showSlide(index) {
        if (slides.length === 0) return;
        
        // Убираем активный класс у всех и добавляем нужному
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Проверка границ индекса
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Инициализируем первый слайд
    if (slides.length > 0) {
        showSlide(0);
    }

    // Автопереключение (ваш интервал, теперь рабочий)
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Автопереключение баннера каждые 5 сек
setInterval(() => {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}, 5000);

// Обработка кнопок мастер-классов
document.querySelectorAll('.booking-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = encodeURIComponent("Здравствуйте! Хочу записаться на мастер-класс.");
        window.open(`https://t.me/Mari_naumova_art?text=${msg}`, '_blank');
    });
});

    // Элементы DOM
    const track1 = document.getElementById('track-1');
    const track2 = document.getElementById('track-2');
    const cartCountBadge = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.querySelector('.cart-overlay');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    let cart = JSON.parse(localStorage.getItem('cartData')) || [];

    // 2. Функция генерации карточки
    function createCardHTML(p) {
        return `
            <div class="art-card">
                <div class="art-image">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/350x450?text=Картина'">
                    <div class="card-overlay">
                        <button class="like-btn">
                            <i class="far fa-heart"></i>
                            <span class="like-count">${p.likes || 0}</span>
                        </button>
                        <button class="add-to-cart-btn">
                            <i class="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                </div>
                <div class="art-info">
                    <h3>${p.title}</h3>
                    <p class="art-specs">${p.size || '40x50'} см | ${p.category}</p>
                    <p class="art-price">${p.price}</p>
                </div>
            </div>
        `;
    }

    // Рендер
    if (track1) track1.innerHTML = [...upperPaintings, ...upperPaintings].map(createCardHTML).join('');
    if (track2) track2.innerHTML = [...lowerPaintings, ...lowerPaintings].map(createCardHTML).join('');

    // 3. Единая логика карусели
  function setupCarousel(track) {
    if (!track) return;
    
    let scrollAmount = 0;
    let isPaused = false;
    let speed = 0.5; // Скорость автопрокрутки

    function animate() {
        if (!isPaused) {
            scrollAmount -= speed;
            
            const halfWidth = track.scrollWidth / 2;
            // Плавный перезапуск цикла
            if (Math.abs(scrollAmount) >= halfWidth) {
                scrollAmount = 0;
            }
            
            track.style.transition = 'none'; // Важно: для автопрокрутки transition не нужен
            track.style.transform = `translateX(${scrollAmount}px)`;
        }
        requestAnimationFrame(animate);
    }

    // Запуск после загрузки контента
    window.addEventListener('load', animate);

    // Пауза при наведении
    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);

    return {
        move: (dir) => { 
            const card = track.querySelector('.art-card');
            const style = window.getComputedStyle(card);
            const marginRight = parseInt(style.marginRight) || 0;
            const cardWidth = card ? card.offsetWidth + marginRight : 380;
            
            // 1. Временно ставим паузу, чтобы анимация не перебивала прыжок
            isPaused = true;
            
            // 2. Включаем плавность только на время перемещения
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            
            // 3. Обновляем общую переменную положения
            scrollAmount += (dir * cardWidth);
            
            // 4. Применяем сдвиг
            track.style.transform = `translateX(${scrollAmount}px)`;
            
            // 5. После окончания анимации (0.6с) снимаем паузу
            setTimeout(() => {
                isPaused = false;
            }, 600);
        }
    };
}

    const control1 = setupCarousel(track1);
    const control2 = setupCarousel(track2);

    window.scrollPrev1 = () => control1?.move(1);
    window.scrollNext1 = () => control1?.move(-1);
    window.scrollPrev2 = () => control2?.move(1);
    window.scrollNext2 = () => control2?.move(-1);

    // 4. Корзина и остальные функции (оставляем без изменений)
    const updateCartUI = () => {
        localStorage.setItem('cartData', JSON.stringify(cart));
        if (cartCountBadge) cartCountBadge.innerText = cart.length;
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">В корзине пока пусто</p>';
            if (cartTotalDisplay) cartTotalDisplay.innerText = '0 ₽';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map((item, index) => {
            const priceNum = parseInt(item.price.replace(/\s/g, ''));
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

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            const card = addBtn.closest('.art-card');
            const title = card.querySelector('h3').innerText;
            const allPaintings = [...upperPaintings, ...lowerPaintings];
            const artData = allPaintings.find(p => p.title === title);
            if (artData) {
                cart.push(artData);
                updateCartUI();
                addBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => addBtn.innerHTML = '<i class="fas fa-shopping-bag"></i>', 1000);
            }
        }

        if (e.target.tagName === 'IMG' && e.target.closest('.art-image')) {
            lightboxImg.src = e.target.src;
            lightboxCaption.innerText = e.target.alt;
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
        }

        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            const icon = likeBtn.querySelector('i');
            const countSpan = likeBtn.querySelector('.like-count');
            let likes = parseInt(countSpan.innerText);
            if (icon.classList.contains('far')) {
                icon.className = 'fas fa-heart';
                icon.style.color = '#e74c3c';
                countSpan.innerText = likes + 1;
            } else {
                icon.className = 'far fa-heart';
                icon.style.color = '';
                countSpan.innerText = likes - 1;
            }
        }
    });

    document.querySelector('.cart-icon')?.addEventListener('click', (e) => {
        e.preventDefault();
        cartDrawer.classList.add('open');
        cartOverlay?.classList.add('open');
    });

    document.getElementById('close-cart')?.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay?.classList.remove('open');
    });

    lightbox?.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300);
    });

    document.querySelector('.copy-email')?.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(() => {
            const span = this.querySelector('.email-text');
            const old = span.innerText;
            span.innerText = 'Скопировано!';
            setTimeout(() => span.innerText = old, 2000);
        });
    });

    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (cart.length === 0) return alert("Корзина пуста");
        const itemList = cart.map(item => `- "${item.title}" (${item.price})`).join('%0A');
        const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\s/g, '')), 0);
        const message = `Здравствуйте! Хочу заказать картины:%0A${itemList}%0A%0AИтого: ${total.toLocaleString()} ₽`;
        window.open(`https://t.me/Mari_naumova_art?text=${message}`, '_blank');
    });

    updateCartUI();
});