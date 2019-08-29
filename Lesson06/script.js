'use strict';

let money,
    start = function() {
        do {
            money = +prompt('Ваш месячный доход?', 'Введите сумму');
        }
        while(isNaN(money) || money == '' || money == null);
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    timeToMission: 0,    
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Введите наименования расходов'),
        nesessaryExpense = '';
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let expense = 0;
        
        for (let i = 0; i < 2; i++) {
            nesessaryExpense = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Введите наименование');
            
            do {
                expense = +prompt('Во сколько это обойдётся?', 'Введите сумму');
            }
            while(isNaN(expense) || expense == '' || expense == null);
            appData.expenses[nesessaryExpense] = expense;
            
            }
    },
    getExpensesMonth: function() {    
        for(let index in appData.expenses) {
            appData.expensesMonth += appData.expenses[index];
        }
    },

    getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        return appData.budgetMonth;
    },

    getTargetMonth: function() {
        let timeToMission;
        // Проверка на деление на ноль:
        (appData.budgetMonth != 0) ? (appData.timeToMission=Math.ceil(appData.mission / appData.budgetMonth)) : (appData.timeToMission = 0);
        return appData.timeToMission;
    },

    getStatusIncome: function() {
        let budgetDay = Math.floor(appData.budgetMonth/30);
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

    }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// console.log('Переменная "money" равна ' + money + ', ' + 'её тип: ' + typeof money);
// console.log('Переменная "income" равна ' + appData.income + ', ' + 'её тип: ' + typeof appData.income);
// console.log('Переменная "deposit" равна ' + appData.deposit + ', ' + 'её тип: ' + typeof appData.deposit);



// let getAccumulatedPeriod = function() {
//     let period = +prompt('Период накопления', 'Введите количество месяцев');
//     return [period, (appData.budgetMonth * period)];
// };

// let periodToOutput = getAccumulatedPeriod();
// // Проверка на возможность накоплений
// if (periodToOutput[1] > 0) {
//     console.log('Накопления за ' + periodToOutput[0] + ' месяцев составят: ' + periodToOutput[1]);
// } else {
//     console.log('Накопления за ' + periodToOutput[0] + ' месяцев равны 0 ');
// }
for(let index in appData.expenses) {
    console.log('Расходы на ' + index + ' равны ' + appData.expenses[index] + ' в месяц');
}
console.log('Общие расходы за месяц составят: ' + appData.expensesMonth);

let target = appData.getTargetMonth();
// Вывод сообщения о недостижимости цели вместо отрицательного
// количества месяцев, а то непонятно:
target > 0 ? console.log('Цель ' + appData.mission + ' будет достигнута через: '+ target + ' месяцев') : console.log('Цель не будет достигнута');

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let index2 in appData) {
    console.log(index2, appData[index2]);
}
