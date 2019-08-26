let money = 20000,
    income = 'Фриланс',
    addExpenses = 'Электричество, Отопление, Вода',
    deposit = false,
    mission = 30000,
    period = 12,
    budgetDay = money / 30;

console.log('money:', typeof money);
console.log('income:', typeof income);
console.log('deposit:', typeof deposit);
console.log('Длина строки income:', income.length);
console.log('Период: ' + period + ' месяцев');
console.log('Цель заработать: ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Дневной бюджет: ' + budgetDay.toFixed(2) + ' , остаток от деления: ' + money%30);
