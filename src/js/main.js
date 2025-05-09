import { initHeaderSwiper, initPostsSwiper } from './modules/swiper.js';
import { initNavigation } from './modules/navigation.js';
import { initFilter } from './modules/filter.js';
import { initVideo } from './modules/video.js';
import { initCounters } from './modules/counters.js';

// Инициализация всех модулей
document.addEventListener('DOMContentLoaded', () => {
    initHeaderSwiper();
    initPostsSwiper();
    initNavigation();
    initFilter();
    initVideo();
    initCounters();
}); 