// Настройка навигации при скролле
export const initNavigation = () => {
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
}; 