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

    countTimer('15 september 2019 18:08');
    

});