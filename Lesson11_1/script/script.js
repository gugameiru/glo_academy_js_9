'use strict';


const start = document.querySelector(`#start`),
    cancel = document.querySelector(`#cancel`),
    btnPlus = document.querySelectorAll(`button`),
    btnIncAdd = btnPlus[0],
    btnExpAdd = btnPlus[1],
    depositCheck = document.querySelector(`#deposit-check`),
    addIncItem = document.querySelectorAll(`.additional_income-item`),
    budgetDayValue = document.querySelector(`.result-budget_day input`),
    budgetMonthValue = document.querySelector(`.result-budget_month input`),
    expensesMonthValue = document.querySelector(`.result-expenses_month input`),
    addIncomeValue = document.querySelector(`.result-additional_income input`),
    addExpValue = document.querySelector(`.result-additional_expenses input`),
    incPeriodValue = document.querySelector(`.result-income_period input`),
    targetMonthValue = document.querySelector(`.result-target_month input`),
    salaryAmount = document.querySelector(`.salary-amount`),
    incomeItems = document.querySelectorAll(`.income-items`),
    expensesItems = document.querySelectorAll(`.expenses-items`),
    addExpItem = document.querySelector(`.additional_expenses-item`),
    targetAmount = document.querySelector(`.target-amount`), 
    periodSelect = document.querySelector(`.period-select`),
    periodAmount = document.querySelector(`.period-amount`),
    depositBank = document.querySelector(`.deposit-bank`),
    depositAmount = document.querySelector(`.deposit-amount`),
    depositPercent = document.querySelector(`.deposit-percent`);

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
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

};

AppData.prototype.check = function() {
    if (salaryAmount.value != '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function() {
    const allInput = document.querySelectorAll('.data input[type = text]');
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
    this.getAddIncomeOrExpenses(addExpItem);
    this.getAddIncomeOrExpenses(addIncItem);
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth.toFixed(0);
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod().toFixed(0);
    periodSelect.addEventListener('change', (() => {
        incPeriodValue.value = this.calcPeriod();
    }).bind(this));
};

AppData.prototype.addBlock = function(item, button) {
    const cloneItem = item[0].cloneNode(true);
    item[0].parentNode.insertBefore(cloneItem, button);
    const itemClass = item[0].className;
    item = document.getElementsByClassName(itemClass);
    if (item.length == 3) {
        button.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(((item) => {
        const itemExpenses = item.querySelector(`.expenses-title`).value;
        const cashExpenses = item.querySelector(`.expenses-amount`).value;
        if (itemExpenses != '' && cashExpenses != '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }).bind(this));
};

AppData.prototype.getIncome = function() {
    incomeItems.forEach(((item) => {
        const itemIncome = item.querySelector(`.income-title`).value;
        const cashIncome = item.querySelector(`.income-amount`).value;
        if (itemIncome != '' && cashIncome != '') {
            this.income[itemIncome] = cashIncome;
        }
    }).bind(this));
};

AppData.prototype.getAddIncomeOrExpenses = function(inputItem) {
    const _this = this;
    if (inputItem.className == 'additional_expenses-item') {
        const addExpenses = inputItem.value.split(',');
        addExpenses.forEach(((item) => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        }).bind(this));} else {
            inputItem.forEach(((item) => {
                item = item.value.trim();
                if (item !== '') {
                    _this.addIncome.push(item);
                }
            }).bind(this));    
        }
};

AppData.prototype.getExpensesMonth = function() {    
    for(const index in this.expenses) {
        this.expensesMonth += parseInt(this.expenses[index]);
    }
};

AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
        this.percentDeposit = +depositPercent.value;
        this.moneyDeposit = +depositAmount.value;
    }
};

AppData.prototype.getIncomeMonth = function() {
    for(let index in appData.income) {
        this.incomeMonth += parseInt(this.income[index]);
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12;
    this.budgetDay = Math.floor(this.budgetMonth/30);
};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth; 
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
    location.reload();
};

AppData.prototype.eventListeners = function() {
    const _this = this;
    depositCheck.addEventListener('change', function() {
        if (depositCheck.checked) {
            depositAmount.style.display = 'inline-block';
            depositBank.style.display = 'inline-block';
            _this.deposit = true;
            depositBank.addEventListener('change', function() {
                let selectIndex = this.options[this.selectedIndex].value;
                if(selectIndex == 'other') {
                    depositPercent.style.display = 'inline-block';
                    depositPercent.disabled = false;
                    depositPercent.value = '';
                }else {
                    depositPercent.style.display = 'none';
                    depositPercent.value = selectIndex;
                }
            });
        }else{
            depositAmount.style.display = 'none';
            depositBank.style.display = 'none';
            depositAmount.value = '';
            _this.deposit = false;
        }
    });
    start.disabled = true;
    salaryAmount.addEventListener('input', () => {
        start.disabled = false;
    });
    start.addEventListener('click', _this.start.bind(_this));
    btnExpAdd.addEventListener('click', () => {
        _this.addBlock(expensesItems, btnExpAdd);
    });
    btnIncAdd.addEventListener('click', () =>{
        _this.addBlock(incomeItems, btnIncAdd);
    });
    salaryAmount.addEventListener('keyup', _this.check);
    cancel.addEventListener('click', _this.reset.bind(_this));
    periodSelect.addEventListener('change', () => {
        periodAmount.innerHTML = periodSelect.value;
});
};


const appData = new AppData();
appData.eventListeners();









