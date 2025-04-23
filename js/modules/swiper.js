// Настройка слайдера первой секции
export const initHeaderSwiper = () => {
    const headerSwiper = new Swiper('.header__content', {
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
};

// Свайпер секции posts
export const initPostsSwiper = () => {
    const postsSwiper = new Swiper('.posts__swiper', {
        // Основные параметры
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,

        // Стрелки
        navigation: {
            nextEl: '.posts__button--next',
            prevEl: '.posts__button--prev',
        },
    });
}; 