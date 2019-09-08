'use strict';

// console.log(allButtons);

let start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    btnPlus = document.querySelectorAll('button'),
    btnIncAdd = btnPlus[0],
    btnExpAdd = btnPlus[1],
    checkBox = document.querySelector('#deposit-check'),
    addIncItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.result-budget_day input'),
    budgetMonthValue = document.querySelector('.result-budget_month input'),
    expensesMonthValue = document.querySelector('.result-expenses_month input'),
    addIncomeValue = document.querySelector('.result-additional_income input'),
    addExpValue = document.querySelector('.result-additional_expenses input'),
    incPeriodValue = document.querySelector('.result-income_period input'),
    targetMonthValue = document.querySelector('.result-target_month input'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'), 
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

const AppData = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.timeToMission = 0;
};

AppData.prototype.check = function() {
    if (salaryAmount.value != '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function() {

      
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item) {
        item.setAttribute('disabled', 'true');
    });
    btnExpAdd.setAttribute('disabled', 'true');
    btnIncAdd.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';
            
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getIncomeMonth();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getStatusIncome();
    this.showResult();
    
};

AppData.prototype.showResult = function() {
    
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', (function() {
        incPeriodValue.value = this.calcPeriod();
    }).bind(this));
    

};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length == 3) {
        btnExpAdd.style.display = 'none';

    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach((function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses != '' && cashExpenses != '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }).bind(this));
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length == 3) {
        btnIncAdd.style.display = 'none';

    }

};
AppData.prototype.getIncome = function() {
    incomeItems.forEach((function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome != '' && cashIncome != '') {
            this.income[itemIncome] = cashIncome;
        }
    }).bind(this));
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = addExpItem.value.split(',');
    addExpenses.forEach((function(item) {
        item = item.trim();
        if (item != '') {
            this.addExpenses.push(item);
        }
    }).bind(this));
};
AppData.prototype.getAddIncome = function() {
    addIncItem.forEach((function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }).bind(this));
};
AppData.prototype.getExpensesMonth = function() {    
    for(let index in this.expenses) {
        this.expensesMonth += parseInt(this.expenses[index]);
    }
};

AppData.prototype.getIncomeMonth = function() {
    for(let index in appData.income) {
        this.incomeMonth += parseInt(this.income[index]);
    }
},

AppData.prototype.getBudget = function() {
    this.budgetMonth = parseInt(this.budget) + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth/30);
    
};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth; 
};

AppData.prototype.getStatusIncome = function() {
    switch (true) {
        case (this.budgetDay > 800):
            return ('Высокий уровень дохода');
            
        case (this.budgetDay > 300 && this.budgetDay <= 800):
            return ('Средний уровень дохода');
            
        case (this.budgetDay >= 0 && this.budgetDay <= 300):
            return ('Низкий уровень дохода');
            
        default:
            return ('Что-то пошло не так'); 
    }

};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function() {
    location.reload();
};

AppData.prototype.eventListeners = function() {
    start.disabled = true;
    salaryAmount.addEventListener('input', function() {
    start.disabled = false;
    });
    start.addEventListener('click', appData.start.bind(appData));
    btnExpAdd.addEventListener('click', appData.addExpensesBlock);
    btnIncAdd.addEventListener('click', appData.addIncomeBlock);
    salaryAmount.addEventListener('keyup', appData.check);
    cancel.addEventListener('click', appData.reset.bind(appData));

    periodSelect.addEventListener('change', function() {
    periodAmount.innerHTML = periodSelect.value;
});

};

const appData = new AppData();
appData.eventListeners();








