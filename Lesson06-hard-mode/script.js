'use strict';

let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

document.write(week.join(', ') + '<br>' + '<hr>');

week.forEach(element => {
    document.write(element + '<br>');
});

document.write('<hr>');

week.forEach(element => {
    if ((element == 'Суббота') || (element == 'Воскресенье')) {
        document.write('<i>' + element + '</i>' + '<br>');
    } else {
        document.write(element + '<br>');
    }
});

document.write('<hr>');

let date = new Date();

week.forEach(element => {
    if (element == week[date.getDay()]) {
        document.write('<b>' + element + '</b>' + '<br>');
    } else {
        document.write(element + '<br>');
    }
});

