const db = firebase.firestore();
var budgets = [];
var expenses = [];

var h2_budgetHeader = document.getElementById("h2_budgetHeader");
var a_budgetCostandAll = document.getElementById("a_budgetCostandAll");
var a_desc = document.getElementById("a_desc");
var span_currentSubbudgCost = document.getElementById("span_currentSubbudgCost");
var table_expensetable = document.getElementById("expensetable");
var div_leftBudgetContainer = document.getElementById("leftBudgetContainer");


var div_addoverlay  = document.getElementById("addoverlay");

var div_addexpensebox = document.getElementById("addexpensebox");
var input_newexpensename = document.getElementById("newexpensename");
var input_newexpensedesc = document.getElementById("newexpensedesc");
var input_newexpensecost = document.getElementById("newexpensecost");
var input_newexpenseto = document.getElementById("newexpenseto");
var input_newexpensesignatory = document.getElementById("newexpensesignatory");

var div_addbudgetbox = document.getElementById("addbudgetbox");
var input_newbudgetname = document.getElementById("newbudgetname");
var input_newbudgetdesc = document.getElementById("newbudgetdesc");
var input_newbudgetalloc = document.getElementById("newbudgetalloc");
var input_newbudgetdate = document.getElementById("newbudgetdate");

var selectedBudget = null;
var viewedBudget = null;
var budgetToggleVar = null;
startBudgetListener();
startExpenseListener();
console.log(budgets.primeParents());
delay(1000).then(() => changeBudgetPage(budgets.primeParents()[0].id));

div_addoverlay.style.display = "none";
div_addbudgetbox.style.display =  "none";
div_addexpensebox.style.display =  "none";