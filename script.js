let income = 'Фриланс',
    mission = 30000,
    period = 12,
    deposit = false;

let money = prompt('Ваш месячный доход?', 'Введите сумму');

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Введите наименования расходов');
console.log(addExpenses.toLowerCase().split(', '));

let ifAnyDeposit = prompt('Есть ли у вас депозит в банке?', 'Ответьте Да или Нет');

if (ifAnyDeposit=='Да') {
    deposit = true;
} else if (ifAnyDeposit=='Нет') {
    deposit = false;
} 

console.log('money:', typeof money);
console.log('income:', typeof income);
console.log('deposit:', typeof deposit);

let nesessaryExpenses1, 
    nesessaryExpenses2,
    nesessaryExpensesSum1,
    nesessaryExpensesSum2;
    

for (let i = 0; i < 2; i++) {
    if (nesessaryExpenses1 != undefined) {
        nesessaryExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Введите наименование');
    } else {
        nesessaryExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Введите наименование');
    }
    if (nesessaryExpensesSum1 != undefined) {
        nesessaryExpensesSum2 = prompt('Во сколько это обойдется?', 'Введите сумму');
    } else {
        nesessaryExpensesSum1 = prompt('Во сколько это обойдется?', 'Введите сумму');
    }
}

let budgetMonth = +money - +nesessaryExpensesSum1 - +nesessaryExpensesSum2;
console.log('Доход за месяц: ', budgetMonth);

let timeToMission = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута через:'+ timeToMission + ' месяцев');

let budgetDay = +(Math.floor(budgetMonth/30)).toFixed(2);
console.log('Бюджет на день: '+ budgetDay);

switch (true) {
    case (budgetDay > 800):
        console.log('Высокий уровень дохода');
        break;
    case (budgetDay > 300 && budgetDay <= 800):
        console.log('Средний уровень дохода');
        break;
    case (budgetDay >= 0 && budgetDay <= 300):
        console.log('Низкий уровень дохода');
        break;
    default:
        console.log('Что-то пошло не так');
        break;

}



