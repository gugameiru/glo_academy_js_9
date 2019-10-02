'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhoto from './modules/commandPhoto';
import digitsOnlyToCalculator from './modules/digitsOnlyToCalculator';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

    // Timer
    countTimer('30 october 2019');
    // Menu
    toggleMenu();
    //popup
    togglePopup();
    //табы
    tabs();
    // Слайдер
    slider();
    //Работа с фото команды
    commandPhoto();
    // Разрешение ввода только цифр в калькулятор
    digitsOnlyToCalculator();
    //  Калькулятор
    calc(100);
    // Send-ajax-form
    sendForm();


