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
    // Убираем активный класс у текущей кнопки
    document.querySelector('.projects__category-btn--active').classList.remove('projects__category-btn--active');

    // Добавляем активный класс к текущей кнопке
    button.classList.add('projects__category-btn--active');


    // Получаем категорию текущей кнопки
    const category = button.getAttribute('data-category');

    // Получаем контейнер с карточками
    const cardsContainer = document.querySelector('.projects__cards');

    // Скрываем контейнер с карточками
    cardsContainer.classList.add('hide');

    
    // После завершения скрытия прячем карточки
    cardsContainer.addEventListener('transitionend', () => {
        // Добавляем категорию отображаемых карточек 
        // в атрибут контейнера
        cardsContainer.setAttribute('data-category', category);

        // Отображаем контейнер с карточками
        cardsContainer.classList.remove('hide');
    }, { once: true });
}