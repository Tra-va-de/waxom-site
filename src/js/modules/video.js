// Воспроизведение видеоролика в секции с презентацией
export const initVideo = () => {
    const presentationContent = document.getElementById("presentation-content");
    const presentationVideo = document.getElementById("presentation-video");
    const playButton = document.getElementById("play-icon");
    const pauseButton = document.getElementById("pause-icon");
    const presentationTimer = document.getElementById('presentation-timer');

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
        pauseButton.classList.add('hide');
        playButton.classList.remove('hide');
    });

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
        // Создаем новый объект даты с указанными секундами
        let date = new Date(1970, 0, 0, 0, 0, + sec || 0);
        // Получаем время в указанном формате
        let time = date.toLocaleTimeString('ru', { minute: '2-digit', second: '2-digit' });

        return time;
    };

    // Вызываем функцию для обновления времени
    setCountdown();

    // Подключаем функцию к событию загрузки мета данных
    presentationVideo.addEventListener('loadedmetadata', setCountdown);

    // Подключаем функцию к событию обновления времени
    presentationVideo.addEventListener('timeupdate', setCountdown);

    // Добавляем обработчик клика на кнопку воспроизведения
    playButton.addEventListener('click', playPresentationVideo);
    pauseButton.addEventListener('click', playPresentationVideo);
}; 