document.addEventListener('DOMContentLoaded', () => {
    // 1. ДАННЫЕ ДЛЯ КАРТИН
    const upperPaintings = [
        { id: 1, title: "Ом", category: "Акрил, паста", price: "4500 ₽", image: "public/images/1.jpg", size: "40x50", likes: 12 },
        { id: 2, title: "Мандала", category: "Акрил, паста", price: "4500 ₽", image: "public/images/2.jpg", size: "30x40", likes: 21 },
        { id: 3, title: "Сквозь свет", category: "Акрил, паста", price: "4500 ₽", image: "public/images/3.jpg", size: "40x50", likes: 15 },
        { id: 4, title: "Осень", category: "Акрил, паста", price: "5500 ₽", image: "public/images/4.jpg", size: "40x50", likes: 19 },
        { id: 5, title: "Намасте", category: "Акрил, паста", price: "3500 ₽", image: "public/images/namaste.jpg", size: "50x50", likes: 16 },
        { id: 6, title: "Сны", category: "Акрил, паста", price: "3500 ₽", image: "public/images/dreams.jpg", size: "40x40", likes: 27 },
        { id: 7, title: "Стена храма", category: "Акрил, паста", price: "3500 ₽", image: "public/images/temple.jpg", size: "38x48", likes: 20 },
        { id: 8, title: "Цветущий Будда", category: "Акрил, паста", price: "6500 ₽", image: "public/images/6.jpg", size: "29x59", likes: 10 }
    ];

    const lowerPaintings = [
        { id: 9, title: "Воздух", category: "Акрил, паста", price: "3500 ₽", image: "public/images/7.jpg", size: "40x50", likes: 8 },
        { id: 10, title: "Прилив", category: "Акрил, паста", price: "3500 ₽", image: "public/images/8.jpg", size: "30x40", likes: 9 },
        { id: 11, title: "Мечты о море", category: "Акрил, паста", price: "7000 ₽", image: "public/images/9.jpg", size: "60x80", likes: 11 },
        { id: 12, title: "Горный мираж", category: "Акрил, паста", price: "7000 ₽", image: "public/images/10.jpg", size: "60x80", likes: 30 },
        { id: 13, title: "Океан", category: "Акрил, паста", price: "5500 ₽", image: "public/images/11.jpg", size: "40x70", likes: 20 },
        { id: 14, title: "Грация", category: "Акрил, паста", price: "4000 ₽", image: "public/images/12.jpg", size: "40x50", likes: 4 },
        { id: 15, title: "Хлопок", category: "Акрил, паста", price: "3000 ₽", image: "public/images/13.jpg", size: "30x40", likes: 14 }
    ];

    // 2. ЭЛЕМЕНТЫ DOM
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
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');

    // 3. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ОТПРАВКИ
    async function sendToTelegram(data) {
        try {
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.ok;
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            return false;
        }
    }

    // 4. ЛОГИКА ВЕРХНЕГО БАННЕРА
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let bannerInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function startAutoPlay() {
        clearInterval(bannerInterval);
        bannerInterval = setInterval(() => showSlide(currentSlide + 1), 3000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    if (slides.length > 0) {
        showSlide(0);
        startAutoPlay();
    }

    // 5. МОБИЛЬНОЕ МЕНЮ
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // 6. МОДАЛЬНОЕ ОКНО: БЕСПЛАТНЫЙ УРОК
    const lessonModal = document.getElementById('lesson-modal');
    const openLessonBtn = document.getElementById('open-lesson-modal');
    const closeLessonBtn = lessonModal?.querySelector('.close-modal');
    const leadForm = document.getElementById('lead-form');

    if (openLessonBtn && lessonModal) {
        openLessonBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lessonModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeLessonBtn?.addEventListener('click', () => {
            lessonModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        lessonModal.addEventListener('click', (e) => {
            if (e.target === lessonModal) {
                lessonModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                name: leadForm.querySelector('input[type="text"]').value,
                phone: leadForm.querySelector('input[type="tel"]').value,
                email: leadForm.querySelector('input[type="email"]')?.value || 'Не указан',
                type: '🎁 Лид-магнит (Урок + PDF)'
            };

            const success = await sendToTelegram(data);

            if (success) {
                window.open('https://vkvideo.ru/video-237346777_456239022?list=ln-tHWeNXQnu8AGNTEPzw', '_blank');
                
                const link = document.createElement('a');
                link.href = 'public/files/guide.pdf';
                link.download = 'Подарок_от_MarinaArt.pdf';
                link.click();

                alert('Спасибо! Урок открыт в новой вкладке, а гайд уже скачивается.');
                
                lessonModal.style.display = 'none';
                document.body.style.overflow = '';
                leadForm.reset();
            } else {
                alert('Произошла ошибка при отправке. Пожалуйста, напишите нам в Telegram напрямую.');
            }
        });
    }

    // 7. МОДАЛЬНОЕ ОКНО: ПОДРОБНЕЕ О МАСТЕР-КЛАССЕ
    const serviceModal = document.getElementById('service-modal');
    const closeService = document.getElementById('close-service');

    if (closeService) {
        closeService.addEventListener('click', () => {
            if (serviceModal) serviceModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('click', (e) => {
        if (!serviceModal) return; 

        if (e.target.classList.contains('open-service-modal')) {
            const card = e.target.closest('.service-card');
            const title = card.querySelector('h3').innerText;
            const price = card.querySelector('.service-price').innerText;
            const desc = card.querySelector('p').innerHTML;
            const imgSrc = card.querySelector('img').src;

            document.getElementById('service-popup-title').innerText = title;
            document.getElementById('service-popup-price').innerText = price;
            document.getElementById('service-popup-desc').innerHTML = desc;
            document.getElementById('service-popup-img').src = imgSrc;

            const message = encodeURIComponent(`Здравствуйте! Хочу уточнить детали по мастер-классу "${title}" (${price}).`);
            document.getElementById('service-tg-link').href = `https://t.me/Mari_naumova_art?text=${message}`;

            serviceModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    // 8. МОДАЛЬНОЕ ОКНО: ОБРАТНЫЙ ЗВОНОК
    const callbackModal = document.getElementById('callback-modal');
    const openCallback = document.getElementById('open-callback');
    const closeCallback = document.getElementById('close-callback');
    const callbackForm = document.getElementById('callback-form');

    if (openCallback && callbackModal) {
        openCallback.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            callbackModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeCallback?.addEventListener('click', () => {
            callbackModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        callbackModal.addEventListener('click', (e) => {
            if (e.target === callbackModal) {
                callbackModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                name: document.getElementById('callback-name').value,
                phone: document.getElementById('callback-phone').value,
                type: '📞 Запрос обратного звонка'
            };

            const success = await sendToTelegram(data);

            if (success) {
                alert('Заявка отправлена! Свяжусь с вами в ближайшее время.');
                callbackForm.reset();
                callbackModal.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                alert('Произошла ошибка. Напишите нам в Telegram напрямую.');
            }
        });
    }

    // 9. ГЕНЕРАЦИЯ КАРТОЧЕК И КАРУСЕЛЬ КАРТИН
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

    if (track1) track1.innerHTML = [...upperPaintings, ...upperPaintings].map(createCardHTML).join('');
    if (track2) track2.innerHTML = [...lowerPaintings, ...lowerPaintings].map(createCardHTML).join('');

    function setupCarousel(track) {
        if (!track) return;
        let scrollAmount = 0;
        let isPaused = false;
        let speed = 0.5;

        function animate() {
            if (!isPaused) {
                scrollAmount -= speed;
                const halfWidth = track.scrollWidth / 2;
                if (Math.abs(scrollAmount) >= halfWidth) scrollAmount = 0;
                track.style.transform = `translateX(${scrollAmount}px)`;
            }
            requestAnimationFrame(animate);
        }
        
        animate(); // Исправлен запуск без ожидания window.load

        track.addEventListener('mouseenter', () => isPaused = true);
        track.addEventListener('mouseleave', () => isPaused = false);

        return {
            move: (dir) => { 
                const card = track.querySelector('.art-card');
                const cardWidth = card ? card.offsetWidth + 30 : 380;
                isPaused = true;
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                scrollAmount += (dir * cardWidth);
                track.style.transform = `translateX(${scrollAmount}px)`;
                setTimeout(() => {
                    track.style.transition = 'none';
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

    // 10. КАРУСЕЛЬ И МОДАЛЬНОЕ ОКНО YOUTUBE SHORTS
    const ytTrack = document.getElementById('ytVideoTrack');
    const ytPrevBtn = document.getElementById('ytPrevBtn');
    const ytNextBtn = document.getElementById('ytNextBtn');
    const ytModal = document.getElementById('ytModal');
    const ytPlayer = document.getElementById('ytPlayer');
    const ytCloseBtn = document.querySelector('.yt-modal-close');

    if (ytTrack && ytPrevBtn && ytNextBtn) {
        ytNextBtn.addEventListener('click', () => {
            const card = ytTrack.querySelector('.video-card');
            const cardWidth = card ? card.offsetWidth + 20 : 300;
            ytTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        ytPrevBtn.addEventListener('click', () => {
            const card = ytTrack.querySelector('.video-card');
            const cardWidth = card ? card.offsetWidth + 20 : 300;
            ytTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-youtube-id');
            if (videoId && !videoId.includes('YOUR_SHORTS_ID') && ytPlayer && ytModal) {
                ytPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                ytModal.style.display = 'flex';
            }
        });
    });

    const closeYtModal = () => {
        if (ytModal && ytPlayer) {
            ytModal.style.display = 'none';
            ytPlayer.src = '';
        }
    };

    if (ytCloseBtn) ytCloseBtn.addEventListener('click', closeYtModal);

    if (ytModal) {
        ytModal.addEventListener('click', (e) => {
            if (e.target === ytModal) closeYtModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && ytModal && ytModal.style.display === 'flex') {
            closeYtModal();
        }
    });

    // 11. КОРЗИНА И ЛАЙКИ
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];

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
            const artData = [...upperPaintings, ...lowerPaintings].find(p => p.title === title);
            if (artData) {
                cart.push(artData);
                updateCartUI();
                addBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => addBtn.innerHTML = '<i class="fas fa-shopping-bag"></i>', 1000);
            }
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

        if (e.target.tagName === 'IMG' && e.target.closest('.art-image')) {
            lightboxImg.src = e.target.src;
            lightboxCaption.innerText = e.target.alt;
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
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
        const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\s/g, '')), 0);
        const message = encodeURIComponent(`Здравствуйте! Хочу заказать картины:\n${cart.map(i => i.title).join(', ')}\nИтого: ${total} ₽`);
        window.open(`https://t.me/Mari_naumova_art?text=${message}`, '_blank');
    });

    updateCartUI();
});