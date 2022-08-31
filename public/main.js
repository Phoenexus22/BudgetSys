const db = firebase.firestore();
var budgets = [];
var expenses = [];

var h2_budgetHeader = document.getElementById("h2_budgetHeader");
var a_budgetCostandAll = document.getElementById("a_budgetCostandAll");
var span_currentSubbudgCost = document.getElementById("span_currentSubbudgCost");
var table_expensetable = document.getElementById("expensetable");
var div_leftBudgetContainer = document.getElementById("leftBudgetContainer");

var selectedBudget = null;



startBudgetListener();
startExpenseListener();