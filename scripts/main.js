'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let income = 'Freelance';
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = true;
let mission = 1000;
let period = 6;

let start = function() {
  do{
    money = prompt("Ваш месячный доход?");
  }
  while (!isNumber(money));
}

start();

console.log(addExpenses.toLowerCase().split(','));


let showTypeOf = function(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);



deposit = confirm("Есть ли у вас депозит в банке");
// let expenses1 = prompt("Введите обязательную статью расходов №1");
// let amount1 = prompt("Во сколько это обойдется?");
// let expenses2 = prompt("Введите обязательную статью расходов №2");
// let amount2 = prompt("Во сколько это обойдется?");

let expenses = [];

function getExpensesMonth() {
  let sum = 0;

    for(let i = 0; i < 2; i++){
      expenses[i] = prompt('Введите обязательную статью расходов');
      sum += +prompt('Во сколько это обойдется?');

      if (isNumber(sum)){
        console.log('Пользователь ввёл число');
      }
    }
  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = accumulatedMonth / 30;

function getAccumulatedMonth() {
   return money - expensesAmount;
}



console.log('Расходы за месяц:', expensesAmount);

function getTargetMonth() {
  return Math.ceil(mission/accumulatedMonth);
}

let getTargetMont = getTargetMonth();

console.log("getExpensesMonth: ", expensesAmount);
console.log("budgetDay: ", budgetDay);

function checkTarget(){
  if (getTargetMont > 0){
    console.log(`Цель по бабкам будет достигнута через столько то месяцев: ${getTargetMont}`);
  } else {
    console.log(`Цель не будет достигнута`);
  }
}

checkTarget();

let getStatusIncome = function (){
  if (budgetDay >= 1200){
    return ("У вас высокий уровень дохода");
  } else if (budgetDay >= 600 && budgetDay < 1200){
    return ("У вас средний уровень дохода");
  } else if (budgetDay < 600 && budgetDay >= 0){
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else {
    return ("Что то пошло не так");
  }
}

console.log(getStatusIncome());
