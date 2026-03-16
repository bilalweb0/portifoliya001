const tgUsername = "bilalweb0"; // ВПИШИ СВОЙ НИК

let cart = [];
let discount = 0; // Скидка по промокоду

// Элементы
const themeBtn = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const foodCards = document.querySelectorAll('.food-card');
const addButtons = document.querySelectorAll('.add-btn');

// Элементы модалки
const cartBtn = document.getElementById('cart-btn');
const modal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartList = document.getElementById('cart-items-list');
const tgLink = document.getElementById('tg-order-link');

// 1. ТЕМНАЯ ТЕМА
themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    themeBtn.innerText = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

// 2. ФИЛЬТРАЦИЯ КАРТОЧЕК
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Меняем активную кнопку
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Показываем/скрываем карточки
        foodCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 3. ДОБАВЛЕНИЕ В КОРЗИНУ
addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));
        
        // Добавляем объект в массив
        cart.push({ id: Date.now(), name, price });
        
        updateCart();
        
        // Анимация
        const originalText = btn.innerText;
        btn.innerText = "✅ Добавлено";
        setTimeout(() => btn.innerText = originalText, 1000);
    });
});

// 4. УПРАВЛЕНИЕ МОДАЛКОЙ И КОРЗИНОЙ
cartBtn.addEventListener('click', () => modal.classList.add('show'));
closeModal.addEventListener('click', () => modal.classList.remove('show'));

function updateCart() {
    // Считаем сумму
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Применяем скидку
    if (discount > 0) {
        total = total - (total * discount);
    }

    // Обновляем шапку
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total-header').innerText = total;
    document.getElementById('modal-total').innerText = total;

    // Отрисовываем список внутри модалки
    cartList.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - ${item.price} ₽</span>
            <button class="del-btn" onclick="removeItem(${item.id})">❌</button>
        `;
        cartList.appendChild(div);
    });

    // Формируем ссылку для ТГ
    if (cart.length > 0) {
        let orderText = `🛍 НОВЫЙ ЗАКАЗ:%0A`;
        cart.forEach(i => orderText += `— ${i.name} (${i.price}₽)%0A`);
        if (discount > 0) orderText += `🎁 Применен промокод!%0A`;
        orderText += `%0A💰 ИТОГ: ${total} ₽`;
        tgLink.href = `https://t.me/${tgUsername}?text=${orderText}`;
    } else {
        tgLink.href = "#";
    }
}

// Удаление отдельного товара
window.removeItem = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// 5. ПРОМОКОД
document.getElementById('apply-promo').addEventListener('click', () => {
    const code = document.getElementById('promo-input').value;
    if (code === 'CYBER10') {
        discount = 0.10; // 10% скидка
        alert('Промокод применен! Скидка 10%');
        updateCart();
    } else {
        alert('Неверный промокод!');
    }
});
const slider = document.querySelector('.snap-slider');

slider.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.snap-card, .snap-slide');
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

    cards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - cardCenter);

       
        if (distance < 100) {
            card.style.transform = "scale(1.05)";
            card.style.opacity = "1";
        } else {
            card.style.transform = "scale(0.95)";
            card.style.opacity = "0.7";
        }
    });
});