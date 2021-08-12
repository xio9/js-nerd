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
const incomeTitle = document.querySelector('.income-title');
const expsTitle = document.querySelector('.expenses-title');
const targetAmount = document.querySelector('.target-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

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

      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getStatusIncome();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getIncome();
      appData.getBudget();
      appData.showResult();
  },
  showResult: function(){
    bdgtMonth.value = appData.budgetMonth;
    bdgtDay.value = Math.ceil(appData.budgetDay);
    expMonth.value = appData.expensesMonth;
    addExp.value = appData.addExpenses.join(', ');
    addIncomeValue.value = appData.addIncome.join(', ');
    targetMonth.value = Math.ceil(appData.getTargetMonth());
    incomePeriod.value = appData.calcPeriod();
    periodSelect.addEventListener('input', appData.calc1);
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

    for(let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getExpensesMonth: function(){
      let sum = 0;

      for(let key in appData.expenses){
        sum += Number(appData.expenses[key]);
      }
      appData.expensesMonth = sum;
  },
  checkTarget: function(){
    if (appData.getTargetMonth > 0){
      console.log(`Цель по бабкам будет достигнута через столько то месяцев: ${appData.getTargetMonth}`);
    } else {
      console.log(`Цель не будет достигнута`);
    }
  },
  getTargetMonth: function(){
    return targetAmount.value / appData.budgetMonth;
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getStatusIncome: function(){
    if (appData.budgetDay >= 1200){
      return ("У вас высокий уровень дохода");
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
      return ("У вас средний уровень дохода");
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0){
      return ("К сожалению у вас уровень дохода ниже среднего");
    } else {
      return ("Что то пошло не так");
    }
  },
  getInfoDeposit: function(){
    if(appData.deposit){
      do{
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while(!isNumber(appData.percentDeposit));
      do{
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while(!isNumber( appData.moneyDeposit));
    }
  },
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  },
  periodNum: function(){
    periodAmount.innerHTML = periodSelect.value;
  },
  calc1: function(){
    incomePeriod.value = appData.calcPeriod();
  }
};

calc.addEventListener('mouseover', appData.checkStart);
calc.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodNum);
// for (let key in appData){
//   console.log("Наша программа включает в себя данные: Ключ= " + key + "Значение= " + appData[key]);
// }

function capitalize(input) {  
  return input.toString().toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');  
}  