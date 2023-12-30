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

    // Получаем все карточки
    const cards = document.querySelectorAll('.projects__card');

    // Создаем массив промисов для отслеживания завершения анимации
    const promises = [];

    // Скрываем все карточки с анимацией
    cards.forEach(card => {
        card.classList.add('hide');

        let needsTransition = card.style.display !== 'none';

        if (needsTransition) {
            promises.push(new Promise(resolve => {
                card.addEventListener('transitionend', () => {
                    resolve();
                    card.style.display = 'none';
                }, { once: true });
            }));
        }
    });

    // После завершения анимации скрытия
    Promise.all(promises).then(() => {
        // Отображаем и плавно появляем нужные карточки
        cards.forEach(card => {
            const cardCategories = card.getAttribute('data-categories').split(' ');

            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                // Добавляем класс для плавного появления
                card.classList.remove('hide'); 
            }
        });
    });
}