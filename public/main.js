const db = firebase.firestore();
var budgets = [];
var expenses = [];

startBudgetListener();
startExpenseListener();