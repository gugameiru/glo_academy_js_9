'use strict';

let income = 'Фриланс',
    mission = 30000,
    period = 12,
    deposit = false,
    money;

let start = function() {
    do {
        money = +prompt('Ваш месячный доход?', 'Введите сумму');
    }
    while(isNaN(money) || money == '' || money == null);
};

start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Введите наименования расходов');


let ifAnyDeposit = prompt('Есть ли у вас депозит в банке?', 'Ответьте Да или Нет');

if (ifAnyDeposit=='Да') {
    deposit = true;
} else if (ifAnyDeposit=='Нет') {
    deposit = false;
} 

let showTypeOf = function(data) {
    return (typeof(data));
};

let nesessaryExpenses1, 
    nesessaryExpenses2;
    

let getExpensesMonth = function() {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
        if (nesessaryExpenses1 != undefined) {
            nesessaryExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Введите наименование');
        } else {
            nesessaryExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Введите наименование');
        }
        do {
            sum = +prompt('Во сколько это обойдётся?', 'Введите сумму');
        }
        while(isNaN(money) || money == '' || money == null);
        sum += sum;
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
    let expenses = expensesAmount;
    return money - expenses;
};

let getAccumulatedPeriod = function() {
    let period = +prompt('Период накопления', 'Введите количество месяцев');
    return [period, (getAccumulatedMonth() * period)];
};

let getTargetMonth = function() {
    let budgetMonth = getAccumulatedMonth();
    let timeToMission;
    // Проверка на деление на ноль:
    (budgetMonth != 0) ? (timeToMission=Math.ceil(mission / budgetMonth)) : (timeToMission = 0);
    return timeToMission;

};

let budgetDay = Math.floor(getAccumulatedMonth()/30);

let getStatusIncome = function(){
    switch (true) {
        case (budgetDay > 800):
            return ('Высокий уровень дохода');
            
        case (budgetDay > 300 && budgetDay <= 800):
            return ('Средний уровень дохода');
            
        case (budgetDay >= 0 && budgetDay <= 300):
            return ('Низкий уровень дохода');
            
        default:
            return ('Что-то пошло не так');
            
    
    }
};

console.log('Переменная "money" равна ' + money + ', ' + 'её тип: ' + showTypeOf(money));
console.log('Переменная "income" равна ' + income + ', ' + 'её тип: ' + showTypeOf(income));
console.log('Переменная "deposit" равна ' + deposit + ', ' + 'её тип: ' + showTypeOf(deposit));

console.log(getStatusIncome());

let periodToOutput = getAccumulatedPeriod();
// Проверка на возможность накоплений
if (periodToOutput[1] > 0) {
    console.log('Накопления за ' + periodToOutput[0] + ' месяцев составят: ' + periodToOutput[1]);
} else {
    console.log('Накопления за ' + periodToOutput[0] + ' месяцев равны 0 ');
}

let target = getTargetMonth();
// Вывод сообщения о недостижимости цели вместо отрицательного
// количества месяцев, а то непонятно:
target > 0 ? console.log('Цель будет достигнута через: '+ target + ' месяцев') : console.log('Цель не будет достигнута');
