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

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const isText = function(n){
  if(typeof(n) === 'string' && !isFinite(n)){
    return true;
  }
}

let expenses = [];

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth : 0,
  expensesMonth: 0,
  income:{},
  incomeMonth: 0,
  addIncome:[],
  expenses:{},
  addExpenses:[],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  app: function(){
    console.log(this);
  },
  checkStart: function(){
    if(salaryAmount.value === ''){
      calc.innerHTML = 'Введите Месячный доход';
      alert('Вы не ввели Месячный доход');
    } else {
      calc.innerHTML = 'Рассчитать';
    }
  },
  start: function() {
      appData.budget = +salaryAmount.value;

      let foo = appData.app.bind(appData);
      foo();
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getStatusIncome();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getIncome();
      appData.getBudget();
      appData.showResult();
      appData.cancel();
  },
  reset: function(){
    console.log(this);
    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses ={};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    calc.style.display = 'block';
    btnCancel.style.display = 'none';
    document.querySelectorAll('input[type=text]').forEach(function(item){
      item.disabled = false;
      item.value = '';
    });
    document.querySelectorAll('.result-total').forEach(function(item){
      item.disabled = true;
    });
    periodSelect.disabled = false;
  },
  cancel: function(){
    document.querySelectorAll('input[type=text]').forEach(function(item){
      item.disabled = true;
    });
    periodSelect.disabled = true;
    calc.style.display = 'none';
    btnCancel.style.display = 'block';
  },
  showResult: function(){
    bdgtMonth.value = this.budgetMonth;
    bdgtDay.value = Math.ceil(this.budgetDay);
    expMonth.value = this.expensesMonth;
    addExp.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcPeriod();
    periodSelect.addEventListener('input', this.calc1);
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function(){
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    incomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });

    for(let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  },
  getExpensesMonth: function(){
      let sum = 0;

      for(let key in this.expenses){
        sum += Number(this.expenses[key]);
      }
      this.expensesMonth = sum;
  },
  checkTarget: function(){
    if (this.getTargetMonth > 0){
      console.log(`Цель по бабкам будет достигнута через столько то месяцев: ${this.getTargetMonth}`);
    } else {
      console.log(`Цель не будет достигнута`);
    }
  },
  getTargetMonth: function(){
    return targetAmount.value / this.budgetMonth;
  },
  getBudget: function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getStatusIncome: function(){
    if (this.budgetDay >= 1200){
      return ("У вас высокий уровень дохода");
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200){
      return ("У вас средний уровень дохода");
    } else if (this.budgetDay < 600 && this.budgetDay >= 0){
      return ("К сожалению у вас уровень дохода ниже среднего");
    } else {
      return ("Что то пошло не так");
    }
  },
  getInfoDeposit: function(){
    if(this.deposit){
      do{
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while(!isNumber(this.percentDeposit));
      do{
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while(!isNumber( this.moneyDeposit));
    }
  },
  calcPeriod: function(){
    return this.budgetMonth * periodSelect.value;
  },
  periodNum: function(){
    periodAmount.innerHTML = periodSelect.value;
  },
  calc1: function(){
    incomePeriod.value = this.calcPeriod();
  }
};

calc.addEventListener('mouseover', appData.checkStart);
calc.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodNum);
btnCancel.addEventListener('click', appData.reset);
// for (let key in appData){
//   console.log("Наша программа включает в себя данные: Ключ= " + key + "Значение= " + appData[key]);
// }

function capitalize(input) {  
  return input.toString().toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');  
}  