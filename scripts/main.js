'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let expenses = [];

let appData = {
  budgetDay: 0,
  budgetMonth : 0,
  expensesMonth: 0,
  income:{},
  addIcome:[],
  expenses:{},
  addExpenses:[],
  deposit: false,
  mission: 1000,
  period: 6,
  asking: function(){
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у вас депозит в банке");

    let answer, key;

    for(let i = 0; i < 2; i++){
      key = prompt('Введите обязательную статью расходов');
      console.log(key);
      answer = prompt('Во сколько это обойдется?');
      appData.expenses[key] = answer;
    }
  },
  getExpensesMonth: function(){
      let sum = 0;

      for(let key in appData.expenses){
        sum += Number(appData.expenses[key]);
        if (isNumber(sum)){
          console.log('Пользователь ввёл число');
        }
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
    console.log("getTargetMonth:", appData.budgetDay = Math.floor(appData.budgetMonth / 30));
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
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
};

let start = function() {
  do{
    money = prompt("Ваш месячный доход?");
  }
  while (!isNumber(money));
}

start();

appData.budget = money;

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.checkTarget();
appData.getStatusIncome();


console.log("Расходы за месяц: ", appData.expensesMonth)


for (let key in appData){
  console.log("Наша программа включает в себя данные: Ключ= " + key + "Значение= " + appData[key]);
}