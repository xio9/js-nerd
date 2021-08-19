'use strict';

const calc = document.getElementById('start');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const check = document.querySelector('#deposit-check');
const incomeItem = document.querySelectorAll('.additional_income-item');
const bdgtMonth = document.getElementsByClassName('budget_month-value')[0];
const bdgtDay = document.getElementsByClassName('budget_day-value')[0];
const expMonth = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExp = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriod = document.getElementsByClassName('income_period-value')[0];
const targetMonth = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelectorAll('.income-title');
const expsTitle = document.querySelector('.expenses-title');
const targetAmount = document.querySelector('.target-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const btnCancel = document.getElementById('cancel');
const checkBox = document.getElementById('deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositPercentHidden = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const isText = function (n) {
  if (typeof (n) === 'string' && !isFinite(n)) {
    return true;
  }
}

let expenses = [];

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  app() {
    console.log(this);
  }

  checkStart = function () {
    let am = depositAmount.value;
    if (salaryAmount.value === '') {
      calc.innerHTML = 'Введите Месячный доход';
      alert('Вы не ввели Месячный доход');
    } else {
      calc.innerHTML = 'Рассчитать';
    }
    if (depositAmount.value === '' || depositAmount.value > 100 || 0 > depositAmount.value || isText(depositAmount.value) == true) {
      alert('Введите корректное значение в поле проценты');
    }
  }

  start() {
    console.log(this);
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getStatusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.cancel();
  }

  reset() {
    console.log(this);
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    appData.moneyDeposit = 0;
    calc.style.display = 'block';
    btnCancel.style.display = 'none';
    document.querySelectorAll('input[type=text]').forEach(function (item) {
      item.disabled = false;
      item.value = '';
    });
    document.querySelectorAll('.result-total').forEach(function (item) {
      item.disabled = true;
    });
    periodSelect.disabled = false;
  }

  cancel() {
    document.querySelectorAll('input[type=text]').forEach(function (item) {
      item.disabled = true;
    });
    periodSelect.disabled = true;
    calc.style.display = 'none';
    btnCancel.style.display = 'block';
  }

  cancel() {
    document.querySelectorAll('input[type=text]').forEach(function (item) {
      item.disabled = true;
    });
    periodSelect.disabled = true;
    calc.style.display = 'none';
    btnCancel.style.display = 'block';
  }

  showResult() {
    const _this = this;
    bdgtMonth.value = this.budgetMonth;
    bdgtDay.value = Math.ceil(this.budgetDay);
    expMonth.value = this.expensesMonth;
    addExp.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcPeriod();
    periodSelect.addEventListener('input', _this.calc1);
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getAddExpenses() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    const _this = this;
    incomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }

  getExpenses() {
    const _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getIncome() {
    const _this = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };

  getExpensesMonth() {
    let sum = 0;

    for (let key in this.expenses) {
      sum += Number(this.expenses[key]);
    }
    this.expensesMonth = sum;
  }
  checkTarget() {
    if (this.getTargetMonth > 0) {
      console.log(`Цель по бабкам будет достигнута через столько то месяцев: ${this.getTargetMonth}`);
    } else {
      console.log(`Цель не будет достигнута`);
    }
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ("У вас высокий уровень дохода");
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ("У вас средний уровень дохода");
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      return ("К сожалению у вас уровень дохода ниже среднего");
    } else {
      return ("Что то пошло не так");
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  periodNum() {
    periodAmount.innerHTML = periodSelect.value;
  }

  calc1() {
    const _this = this;
    incomePeriod.value = _this.calcPeriod();
  }

  changePercent(event) {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      console.log();
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }

  depositHandler() {
    if (checkBox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners = function () {
    calc.addEventListener('mouseover', this.checkStart);
    calc.addEventListener('click', this.start.bind(this));

    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.periodNum);
    btnCancel.addEventListener('click', this.reset);
    checkBox.addEventListener('change', this.depositHandler.bind(this));


    // for (let key in appData){
    //   console.log("Наша программа включает в себя данные: Ключ= " + key + "Значение= " + appData[key]);
    // }

    function capitalize(input) {
      return input.toString().toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }
  }
};


const appData = new AppData();

appData.eventListeners();

console.log(appData);

