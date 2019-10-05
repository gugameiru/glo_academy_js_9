window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Получение разных кнопок и запуск разных функций
    const getButtons = () => {
        const body = document.querySelector('body');
        body.addEventListener('click', (event) => {
            let target = event.target;
            
            switch (true) {
                case ((target.className.indexOf('call-btn') != -1) || (target.className.indexOf('check-btn') != -1)):
                    togglePopup(target);
                    break;
            }
        });
    };

    getButtons();


    //Универсальный попап
    const togglePopup = (target) => {
        const popupCall = document.querySelector('.popup-call'),
            popupCheck = document.querySelector('.popup-check');
        let popup;

        if (target.className.indexOf('call-btn') != -1) {
            popup = popupCall;
        } else if (target.className.indexOf('check-btn') != -1) {
            popup = popupCheck;
        } else {
            return;
        }

        //Здесь реализовано отключение анимации для мобильных устройств
        if (window.screen.width < 768) {
            popup.style.display = 'block';
        } else {
            setOpacity(popup);
        }

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                console.log(target);
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
        
    };

    // Анимация - плавное изменение прозрачности
    const setOpacity = (elem) => {
        let opacity = 0;
        elem.style.display = 'block';
        elem.style.opacity = opacity;
        setTimeout(function change() {
            if (opacity > 1) {
                return;
            }
            elem.style.opacity = opacity;
            opacity += 0.01;
            setTimeout(change, 0.1);
        }, 60);
    };

});