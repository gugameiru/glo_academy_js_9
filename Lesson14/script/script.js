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

    countTimer('19 september 2019');
    
    // Menu

    const toggleMenu = () => {

        const menu = document.querySelector('menu'),
              main = document.querySelector('main');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', (event) => {
            let target = event.target;
            console.log(target);
            if (target.classList.contains('close-btn') || target.closest('menu ul>li')) {
                handlerMenu();
            }
        });

        main.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('.menu')) {
                handlerMenu();
            } else {
                menu.classList.remove('active-menu');
            }
        });

    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
            
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

    togglePopup();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index == i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', () => {
            let target = event.target;    
            target = target.closest('.service-header-tab');              
            if (target) {
                tab.forEach((item, i) => {
                    if(item == target) {
                        toggleTabContent(i);
                    }
                });
            }

        });
    };

    tabs();

});