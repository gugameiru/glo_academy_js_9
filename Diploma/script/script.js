window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Получение разных кнопок и запуск разных функций
    const getButtons = () => {
        const body = document.querySelector('body');
        body.addEventListener('click', (event) => {
            let target = event.target;
            
            switch (true) {
                case ((target.className.indexOf('call-btn') != -1) || (target.className.indexOf('check-btn') != -1) || (target.className.indexOf('discount-btn') != -1)):
                    togglePopup(target);
                    break;
                case (target.className.indexOf('add-sentence-btn') != -1):
                    addSentense(target);
                    break;

            }
        });
    };

    getButtons();


    //Универсальный попап
    const togglePopup = (target) => {
        const popupCall = document.querySelector('.popup-call'),
            popupCheck = document.querySelector('.popup-check'),
            popupDiscount = document.querySelector('.popup-discount');
        let popup;

        if (target.className.indexOf('call-btn') != -1) {
            popup = popupCall;
        } else if (target.className.indexOf('check-btn') != -1) {
            popup = popupCheck;
        } else if (target.className.indexOf('discount-btn') != -1) {
            popup = popupDiscount;
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

    // Добавление блоков по кнопке "Больше"
    const addSentense = (target) => {
        const actionBlocks = document.querySelector('.text-center>.row').children;

        Array.from(actionBlocks).forEach(function(element) {
            if (element.classList.contains('display: none') != -1) {
                element.className = 'col-xs-12 col-sm-6 col-md-4';
                element.style.display = 'block';
                console.log(element);

            }
        });
        
        target.style.display = 'none';
    };

});