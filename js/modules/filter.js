// Сортировка по категориям
export const initFilter = () => {
    const filterButtons = document.querySelectorAll('.projects__category-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => filterCards(button));
    });
};

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