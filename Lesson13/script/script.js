window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
        
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000, //количество секунд всего
            seconds = addZeros(Math.floor(timeRemaining) % 60),//Секунды для таймера
            minutes = addZeros(Math.floor(timeRemaining/60) % 60),
            hours = addZeros(Math.floor(timeRemaining/3600));
           
            if (timeRemaining < 0) {
                seconds = minutes = hours = '00';
            }

            function addZeros(timeValue) {
                if (timeValue < 10) {
                    return ('0' + timeValue);
                }else{
                    return timeValue;
                }
            }

            return {timeRemaining, hours, minutes, seconds};
        }

        let idInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let timer = getTimeRemaining();           

            if (timer.timeRemaining > 0) {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
            } else {
                clearInterval(idInterval);
            }
        }
       
	}

    countTimer('17 september 2019 18:08');
    
    // Menu

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              closeBtn = document.querySelector('.close-btn'),
              menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => {
            elem.addEventListener('click', handlerMenu);
        });

    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupCloseBtn = document.querySelector('.popup-close');
            
            //Здесь реализовано отключение анимации для мобильных устройств
            popupBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    if (window.screen.width < 768) {
                        popup.style.display = 'block';
                    }else {
                        setOpacity(popup);
                    }
                });
            });

            popupCloseBtn.addEventListener('click', () => {
                popup.style.display = 'none';
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
            opacity += 0.1;
            setTimeout(change, 60);
        }, 60);
    };

    togglePopup();

});