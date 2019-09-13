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

class AppData {
    constructor() {
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
    }
    check() {
        if (salaryAmount.value != '') {
            start.removeAttribute('disabled');
        }
    }
    start() {
        const allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach(function (item) {
            item.setAttribute('disabled', 'true');
        });
        btnExpAdd.setAttribute('disabled', 'true');
        btnIncAdd.setAttribute('disabled', 'true');
        start.style.display = 'none';
        cancel.style.display = 'block';
        depositBank.setAttribute('disabled', 'true');
        depositCheck.setAttribute('disabled', 'true');
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
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth.toFixed(0);
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth()).toFixed(0);
        incPeriodValue.value = this.calcPeriod().toFixed(0);
        periodSelect.addEventListener('change', (() => {
            incPeriodValue.value = this.calcPeriod();
        }).bind(this));
    }
    addBlock(item, button) {
        const cloneItem = item[0].cloneNode(true);
        item[0].parentNode.insertBefore(cloneItem, button);
        const itemClass = item[0].className;
        item = document.getElementsByClassName(itemClass);
        if (item.length == 3) {
            button.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach(((item) => {
            const itemExpenses = item.querySelector(`.expenses-title`).value;
            const cashExpenses = item.querySelector(`.expenses-amount`).value;
            if (itemExpenses != '' && cashExpenses != '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }).bind(this));
    }
    getIncome() {
        incomeItems.forEach(((item) => {
            const itemIncome = item.querySelector(`.income-title`).value;
            const cashIncome = item.querySelector(`.income-amount`).value;
            if (itemIncome != '' && cashIncome != '') {
                this.income[itemIncome] = cashIncome;
            }
        }).bind(this));
    }
    getAddIncomeOrExpenses(inputItem) {
        const _this = this;
        if (inputItem.className == 'additional_expenses-item') {
            const addExpenses = inputItem.value.split(',');
            addExpenses.forEach(((item) => {
                item = item.trim();
                if (item !== '') {
                    _this.addExpenses.push(item);
                }
            }).bind(this));
        }
        else {
            inputItem.forEach(((item) => {
                item = item.value.trim();
                if (item !== '') {
                    _this.addIncome.push(item);
                }
            }).bind(this));
        }
    }
    getExpensesMonth() {
        for (const index in this.expenses) {
            this.expensesMonth += parseInt(this.expenses[index]);
        }
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
    }
    getIncomeMonth() {
        for (let index in appData.income) {
            this.incomeMonth += parseInt(this.income[index]);
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    reset() {
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
        salaryAmount.value = '';
        budgetMonthValue.value = '';
        budgetDayValue.value = '';
        expensesMonthValue.value = '';
        addExpValue.value = '';
        addIncomeValue.value = '';
        targetMonthValue.value = '';
        incPeriodValue.value = '';
        const allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach(function (item) {
            item.removeAttribute('disabled', 'true');
            item.value = '';
        });
        depositCheck.checked = false;
        btnExpAdd.removeAttribute('disabled', 'true');
        btnIncAdd.removeAttribute('disabled', 'true');
        depositCheck.removeAttribute('disabled', 'true');
        depositBank.removeAttribute('disabled', 'true');
        start.style.display = 'block';
        cancel.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.style.display = 'none';
        depositAmount.value = '';
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;
    }
    eventListeners() {
        const _this = this;
        depositCheck.addEventListener('change', function () {
            if (depositCheck.checked) {
                depositAmount.style.display = 'inline-block';
                depositBank.style.display = 'inline-block';
                _this.deposit = true;
                depositBank.addEventListener('change', function () {
                    let selectIndex = this.options[this.selectedIndex].value;
                    if (selectIndex == 'other') {
                        depositPercent.style.display = 'inline-block';
                        depositPercent.disabled = false;
                        depositPercent.value = '';
                    }
                    else {
                        depositPercent.style.display = 'none';
                        depositPercent.value = selectIndex;
                    }
                });
            }
            else {
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
        btnIncAdd.addEventListener('click', () => {
            _this.addBlock(incomeItems, btnIncAdd);
        });
        salaryAmount.addEventListener('keyup', _this.check);
        cancel.addEventListener('click', _this.reset.bind(_this));
        periodSelect.addEventListener('change', () => {
            periodAmount.innerHTML = periodSelect.value;
        });
    }
}

const appData = new AppData();
appData.eventListeners();









