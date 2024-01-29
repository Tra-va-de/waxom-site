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


// Воспроизведение видеоролика в секции с презентацией
const presentationContent = document.getElementById("presentation-content");
const presentationVideo = document.getElementById("presentation-video");

const playButton = document.getElementById("play-icon");
const pauseButton = document.getElementById("pause-icon");

// Функция воспроизведения видео
const playPresentationVideo = () => {
    // Проверка наличия класса, отвечающего за отображения видео
    if (presentationContent.classList.contains('show-video')) {
        // Удаления класса при наличии
        presentationContent.classList.remove('show-video');
        pauseButton.classList.add('hide');
        playButton.classList.remove('hide');
    } else {
        // Добавления при отсутствии
        presentationContent.classList.add('show-video');
        playButton.classList.add('hide');
        pauseButton.classList.remove('hide');
    }

    // Подключаем функцию к событию окончания перехода
    presentationVideo.addEventListener('transitionend', () => {
        // Проверяем, включено ли видео
        if (presentationVideo.paused) {
            // Если нет, то включаем
            presentationVideo.play();
        } else {
            // Иначе ставим на паузу
            presentationVideo.pause();
        }
    }, { once: true });
};


// Подключаем к событию завершения видео функцию
presentationVideo.addEventListener('ended', () => {
    // Удаляем класс отображения видео с блока контента
    presentationContent.classList.remove('show-video');
});


// Настройка отображения времени до конца ролика 
// в секции презинтации
const presentationTimer = document.getElementById('presentation-timer');

// Функция установки текущего оставшегося до конца ролика времени 
const setCountdown = () => {
    // Получаем разницу между длиной ролика и текущего времени воспроизведения
    let secondsLeft = presentationVideo.duration - presentationVideo.currentTime;
    // Форматируем с помощью функции convertSeconds()
    let timeLeft = convertSeconds(secondsLeft);
    
    // Устанавливаем значение в тег
    presentationTimer.textContent = timeLeft;
};

// Функция конвертации времени в нужный формат
const convertSeconds = (sec) => {
    let date = new Date(1970, 0, 0, 0, 0, + sec || 0);
    let time = date.toLocaleTimeString('ru', {minute: '2-digit', second: '2-digit'});

    return time;
};

// Вызываем функцию для обновления времени
setCountdown();

// Подключаем функцию к событию загрузки мета данных
presentationVideo.addEventListener('loadedmetadata', setCountdown);

// Подключаем функцию к событию обновления времени
presentationVideo.addEventListener('timeupdate', setCountdown);