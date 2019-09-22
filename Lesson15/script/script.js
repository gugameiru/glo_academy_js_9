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

    // Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dotWrapper = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');
            
        let currentSlide = 0,
            interval;
            
        // Начало скрипта для добавления точек на страницу
        slide.forEach(() => {
            let dot = document.createElement('li');
            dot.classList.add('dot');
            dotWrapper.appendChild(dot);
        });
        // Конец скрипта добавления точек на страницу
        let dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide ,time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                
                currentSlide++;
                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }
                
            } else if (target.matches('#arrow-left')) {
               
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                }
                
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem == target) {
                        currentSlide = index;
                    }
                });
            }
        
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            let target = event.target;
            // console.log(target);
            
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                stopSlide();
            }
           
        });

        slider.addEventListener('mouseout', (event) => {
            let target = event.target;
            // console.log(target);
            
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                startSlide(2000);
            }
           
        });

        startSlide(2000);

    };

    slider();

    //Работа с фото команды
    
    const commandPhoto = () => {
        const photos = document.querySelector('.command>.container');

        photos.addEventListener('mouseover', (event) => {
            let target = event.target;
                
            if(target.matches('.command__photo')) {
                target.dataset.originalImg = target.src; 
                target.src = target.dataset.img;
            }
        });

        photos.addEventListener('mouseout', (event) => {
            let target = event.target;
            if(target.matches('.command__photo')) {
                target.src = target.dataset.originalImg;
            }
        });
    };

    commandPhoto();

    // Разрешение ввода только цифр в калькулятор

    const digitsOnlyToCalculator = () => {
        const calculator = document.querySelectorAll('.calc-block>input');

        calculator.forEach((element) => {
            element.addEventListener('input', () => {
                element.value = element.value.replace(/\D/g, '');
            });
        });
        
    };

    digitsOnlyToCalculator();

});