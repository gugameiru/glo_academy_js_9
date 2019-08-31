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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    timeToMission: 0,    
    asking: function(){

        if(confirm('Есть ли у вас доп. заработок?')) {
            let itemIncome; 
            do {
                itemIncome= prompt('Какой у вас есть дополнительный заработок?', 'Таксую'); 
            } while (appData.validationString(itemIncome));
            let cashIncome;
            do {
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000); 
            } while (appData.validationDigits(cashIncome));
            appData.income[itemIncome] = cashIncome;        
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Введите наименования расходов'),
        nesessaryExpense = '';
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        let expense = 0;        
        for (let i = 0; i < 2; i++) {
            do {
            nesessaryExpense = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Введите наименование');
            } while (appData.validationString(nesessaryExpense));
            do {
                expense = +prompt('Во сколько это обойдётся?', 'Введите сумму');
            }
            while(appData.validationDigits(expense));
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

    },
    getInfoDeposit: function(){
        if (appData.deposit) {
            do {
                appData.moneyDeposit = prompt('Поговорим о депозите. Какая сумма заложена?', 10000);
                } while (appData.validationDigits(appData.moneyDeposit));
            do {
            appData.percentDeposit = prompt('Размер годового процента?','6');
            } while (appData.validationDigits(appData.percentDeposit));
        }

    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    },
    validationDigits: function(value) {
        if (isNaN(value) || value == '' || value == null) {
            return true;
        } else {
            return false;
        }
    },
    validationString: function(value) {
        if (value === '' || /[0-9]/.test(value) == true || value == null){
            return true;
        } else {
            return false;
        }
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();

for(let index in appData.expenses) {
    console.log('Расходы на ' + index + ' равны ' + appData.expenses[index] + ' в месяц');
}
console.log('Общие расходы за месяц составят: ' + appData.expensesMonth);

let target = appData.getTargetMonth();
// Вывод сообщения о недостижимости цели вместо отрицательного
// количества месяцев, а то непонятно:
target > 0 ? console.log('Цель ' + appData.mission + ' будет достигнута через: '+ target + ' месяцев') : console.log('Цель не будет достигнута');

console.log(appData.getStatusIncome());

console.log('Возможные расходы:');
let probablyExpenses = [];
appData.addExpenses.forEach(element => {
    let newStr = element[0].toUpperCase() + element.slice(1);
    probablyExpenses.push(newStr);
});
console.log(probablyExpenses.join(', '));

console.log('Наша программа включает в себя данные: ');
for (let index3 in appData) {
    console.log(index3, appData[index3]);
}
