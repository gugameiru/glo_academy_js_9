window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    function myClock(newYear) {
        let dayTime = document.querySelector('.daytime'),
            weekDay = document.querySelector('.weekday'),
            timeNow = document.querySelector('.timenow'),
            amPm = document.querySelector('.ampm'),
            daysLast = document.querySelector('.dayslast');

        function getContent() {
            let date = new Date(),
                hours = date.getHours(),
                minutes = addZeros(date.getMinutes()),
                seconds = addZeros(date.getSeconds()),
                amPmContent = (hours >= 12) ? "PM " : "AM ",
                weekDayContent = dayOfWeek(date.getDay()),
                dayTimeContent = '',
                daysLastContent = 0;

            daysLastContent = Math.floor(((new Date(newYear).getTime()) - (date.getTime())) / 1000 / 3600 / 24);

            switch (true) {
                case ((hours >= 0) && (hours < 6)):
                    dayTimeContent = 'Доброй ночи!';
                    break;
                case ((hours >= 6) && (hours < 12)):
                    dayTimeContent = 'Доброе утро!';
                    break;
                case ((hours >= 12) && (hours < 18)):
                    dayTimeContent = 'Добрый день!';
                    break;
                case ((hours >= 18) && (hours < 24)):
                    dayTimeContent = 'Добрый вечер!';
                    break;
                default:
                    dayTimeContent = 'Что-то не так...';
                    break;
            }

            function addZeros(timeValue) {
                if (timeValue < 10) {
                    return ('0' + timeValue);
                }else{
                    return timeValue;
                }
            }

            function dayOfWeek(weekDay) {
                let weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
                return weekDays[weekDay];
            }

            hours = addZeros(hours >= 12 ? hours - 12: hours);

            return {dayTimeContent, weekDayContent, hours, minutes, seconds, amPmContent, daysLastContent};
        }

        let idInterval = setInterval(updateMyClock, 1000);

        function updateMyClock() {
            let clock = getContent();

            if (clock.daysLastContent > 0) {
                dayTime.textContent = clock.dayTimeContent;
                weekDay.textContent = clock.weekDayContent;
                timeNow.textContent = clock.hours + ':' + clock.minutes + ':' + clock.seconds;
                amPm.textContent = clock.amPmContent;
                daysLast.textContent = clock.daysLastContent;
            } else {
                clearInterval(idInterval);
            }

        }
    }
    myClock('01 january 2020');
});