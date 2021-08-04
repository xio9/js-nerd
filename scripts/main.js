'use strict';

let money = prompt("Ваш месячный доход?", 5000);
let income = 'Freelance';
let addExpenses  = 'taxi, football, beer';
let deposit = true;
let mission = 1000;
let period = 6;


let showTypeOf = function(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


addExpenses += prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке");
let expenses1 = prompt("Введите обязательную статью расходов №1");
let amount1 = prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов №2");
let amount2 = prompt("Во сколько это обойдется?");

let accumulatedMonth = getAccumulatedMonth();

let budgetDay = accumulatedMonth / 30;

function getAccumulatedMonth() {
   return money - getExpensesMonth();
}

function getExpensesMonth() {
  return amount1 + amount2;
}

function getTargetMonth() {
  return Math.ceil(mission/accumulatedMonth);
}

console.log("getExpensesMonth: ", getExpensesMonth());
console.log("budgetDay: ", budgetDay);

console.log("addExpenses: ", addExpenses.toLoweCase().split(','));

console.log(`Цель по бабкам будет достигнута через столько то месяцев: ${getTargetMonth()}`);

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
