let money = 20000;
let income = 'Фриланс';
let addExpenses = '400, 500, 600';
let deposit = false;
let mission = 30000;
let period = 12;
let budgetDay = money / 30;

console.log('money:', typeof money);
console.log('income:', typeof income);
console.log('deposit:', typeof deposit);
console.log('Длина строки income:', income.length);
console.log('Период: ' + period + ' месяцев');
console.log('Цель заработать: ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Дневной бюджет: ' + budgetDay.toFixed(2) + ' , остаток от деления: ' + money%30);
