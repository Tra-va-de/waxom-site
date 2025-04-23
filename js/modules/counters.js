// Анимированный счетчик секции counters
export const initCounters = () => {
    // Функция для обновления значения статистики с анимацией
    function updateStatistic(element, targetValue) {
        let startValue = 0;
        const increment = Math.ceil(targetValue / 100); // Инкрементное значение для плавного увеличения

        // Функция для анимации обновления значения
        function animateValue() {
            startValue += increment; // Увеличение значения
            if (startValue <= targetValue) {
                element.textContent = startValue; // Обновление элемента новым значением
                requestAnimationFrame(animateValue); // Продолжение анимации
            } else {
                element.textContent = targetValue; // Установка конечного значения
            }
        }

        animateValue();

        window.removeEventListener('scroll', handleScroll); // Удаляем обработчик события после выполнения
    }

    // Обрабатывает событие прокрутки и обновляет статистику, когда элементы находятся в видимой области
    function handleScroll() {
        const elements = document.querySelectorAll('.counters__number'); // Находим все элементы с классом counters__number

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            // Проверяем, находится ли элемент в видимой области
            const isSectionVisible = elementPosition >= 0 && elementBottom <= window.innerHeight;
            if (isSectionVisible) {
                // Получаем целевое значение элемента и обновляем статистику
                const targetValue = parseInt(element.textContent);
                updateStatistic(element, targetValue);
            }
        });
    }

    // Подключаем функцию к событию скролла
    window.addEventListener('scroll', handleScroll);
}; 