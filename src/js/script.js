// Настройка слайдера первой секции
const swiper = new Swiper('.header__content', {
    // Основные параметры
    direction: 'horizontal',
    loop: true,

    // Пагинация
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Стрелки
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// Настройка навигации при скролле
const nav = document.querySelector(".nav");

window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;

    if (scrollDistance > 0) {
        if (nav.classList.contains('nav--top')) {
            nav.classList.remove('nav--top');
        }
    } else {
        nav.classList.add('nav--top');
    }
});


// Сортировка по категориям
function filterCards(button) {
    // Убираем активный класс у всех кнопок
    const buttons = document.querySelectorAll('.projects__category-btn');
    buttons.forEach(categoryBtn => categoryBtn.classList.remove('projects__category-btn--active'));

    // Добавляем активный класс к текущей кнопке
    button.classList.add('projects__category-btn--active');

    // Получаем категорию текущей кнопки
    const category = button.getAttribute('data-category');

    // Получаем контейнер с карточками
    const cardsContainer = document.querySelector('.projects__cards');

    // Получаем все карточки
    const cards = document.querySelectorAll('.projects__card');

    // Скрываем контейнер с карточками
    cardsContainer.classList.add('hide');

    // После завершения скрытия прячем карточки
    cardsContainer.addEventListener('transitionend', () => {
        // Перебираем карточки для фильтрации
        cards.forEach(card => {
            // Отображаем и плавно появляем нужные карточки
            const cardCategories = card.getAttribute('data-categories').split(' ');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Отображаем контейнер с карточками
        cardsContainer.classList.remove('hide');
    }, { once: true });
}