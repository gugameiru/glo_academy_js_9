window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    function myClock() {
        let clockData = document.querySelector('h1');

        function getContent() {
            let date = new Date(),
                hours = addZeros(date.getHours()),
                minutes = addZeros(date.getMinutes()),
                seconds = addZeros(date.getSeconds()),
                day = addZeros(date.getDate()),
                month = addZeros(date.getMonth() + 1),
                year = date.getFullYear();
                
            function addZeros(timeValue) {
                if (timeValue < 10) {
                    return ('0' + timeValue);
                }else{
                    return timeValue;
                }
            }

            return {hours, minutes, seconds, day, month, year};
        }

        function updateMyClock() {
            let clock = getContent();

            clockData.textContent = `${clock.hours}:${clock.minutes}:${clock.seconds} ${clock.day}.${clock.month}.${clock.year}`;   

        }
        setInterval(updateMyClock, 1000);
    }
    myClock();
});