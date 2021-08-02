'use strict';

let money = 300000;
let income = 'Freelance';
let addExpenses  = 'taxi, football, beer';
let deposit = true;
let mission = 100000000000000;
let period = 6;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission } долларов`);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);


money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке");
let expenses1 = prompt("Введите обязательную статью расходов №1");
let amount1 = prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов №2");
let amount2 = prompt("Во сколько это обойдется?");

let budgetMonth = money - amount1 - amount2;

budgetDay = budgetMonth / 30;


console.log("money: ", money);
console.log("addExpenses: ", addExpenses);
console.log("deposit: ", deposit);
console.log(`Цель по бабкам будет достигнута через столько то месяцев: ${Math.ceil(mission/budgetMonth)}`);
if (budgetDay >= 1200){
  console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay < 1200){
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay >= 0){
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
  console.log("Что то пошло не так");
}
