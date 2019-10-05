window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //popup

    const togglePopup = () => {
        const popupCall = document.querySelector('.popup-call'),
            callBtn = document.querySelectorAll('.call-btn');

        //Здесь реализовано отключение анимации для мобильных устройств
        callBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (window.screen.width < 768) {
                    popupCall.style.display = 'block';
                } else {
                    setOpacity(popupCall);
                }
            });
        });

        popupCall.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popupCall.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                console.log(target);
                if (!target) {
                    popupCall.style.display = 'none';
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

    togglePopup();

});