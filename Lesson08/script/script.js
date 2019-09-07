'use strict';

// console.log(allButtons);

let btnStart = document.querySelector('#start'),
    btnCancel = document.querySelector('#cancel'),
    btnPlus = document.querySelectorAll('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    resultTotalInputs = document.querySelectorAll('.result-total'),
    budgetDayValue = document.querySelectorAll('.budget_day-value')[0],
    budgetMonthValue = document.querySelectorAll('.budget_month-value')[0],
    expensesMonthValue = document.querySelectorAll('.expenses_month-value')[0],
    additionalIncomeValue = document.querySelectorAll('.additional_income-value')[0],
    additionalExpensesValue = document.querySelectorAll('.additional_expenses-value')[0],
    targetMonthValue = document.querySelectorAll('.target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'), 
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    incomeItem = document.querySelectorAll('.income-items');





let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    timeToMission: 0,
    start: function() {

        if(salaryAmount.value == '') {
            btnStart.disabled = true;
            return;
        }
        

        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
                
        appData.budget = salaryAmount.value;

        appData.inputLock();
        appData.getExpenses();
        appData.getIncome();
        appData.getIncomeMonth();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
        
    }, 
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcPeriod();
        });
        

    },  
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length == 3) {
            expensesPlus.style.display = 'none';

        }
    }, 
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses != '' && cashExpenses != '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length == 3) {
            incomePlus.style.display = 'none';

        }

    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome != '' && cashIncome != '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item != '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {    
        for(let index in appData.expenses) {
            appData.expensesMonth += parseInt(appData.expenses[index]);
        }
    },
    getIncomeMonth: function() {
        for(let index in appData.income) {
            appData.incomeMonth += parseInt(appData.income[index]);
        }
    },

    getBudget: function() {
        appData.budgetMonth = parseInt(appData.budget) + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        return appData.budgetMonth;
    },

    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth; 
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
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    inputLock: function() {
        expensesItems.readOnly = true;
        salaryAmount.readOnly = true;
        additionalIncomeItem.forEach(function(item) {
            item.readOnly = true;
        });
        expensesItems.forEach(function(item) {
            item.querySelector('.expenses-title').readOnly = true;
            item.querySelector('.expenses-amount').readOnly = true;            
        });
        incomeItems.forEach(function(item) {
            item.querySelector('.income-title').readOnly = true;
            item.querySelector('.income-amount').readOnly = true;
        });
        expensesTitle.readOnly = true;
        additionalExpensesItem.readOnly = true;
        additionalIncomeItem.readOnly = true;
        targetAmount.readOnly = true;
        
    }

};

btnStart.disabled = true;
salaryAmount.addEventListener('input', function() {
    btnStart.disabled = false;
});
btnStart.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', function() {
    periodAmount.textContent = periodSelect.value;
});




