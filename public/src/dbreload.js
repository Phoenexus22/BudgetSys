function budgetReload()
{
    //remove all elements with classes indicating they are dependent on budget data
    removeElementsByClass("budgDpd"); 
    remakeBudgetBar();
}

function remakeBudgetBar()
{
    arrayofChoice = (selectedBudget==null)?budgets.primeParents():selectedBudget.children();
    for (let i = 0; i < arrayofChoice.length; i++)
    {
        var tempchild = document.createElement("div");
        tempchild.classList.add("fillx");
        tempchild.classList.add("cflex");
        tempchild.classList.add("budgDpd");
        tempchild.classList.add("centercontent");
        tempchild.classList.add("basicborder");
        tempchild.classList.add("leftbudget");
        tempchild.classList.add("hovclick_lightblue");
        var tempBudgName = document.createElement("a");
        tempBudgName.classList.add("semibold");
        tempBudgName.classList.add("capital");

        tempBudgName.innerHTML = arrayofChoice[i].name;
        var tempBudgCostAlloc = document.createElement("a");
        tempBudgCostAlloc.innerHTML = `${arrayofChoice[i].currentCost}/${arrayofChoice[i].allocatedCost}`;

        tempBudgCostAlloc.classList.add((arrayofChoice[i].percentFull() > 75)?"tx_orange":(arrayofChoice[i].percentFull() > 100)?"tx_red":"tx_black");
        
        tempchild.appendChild(tempBudgName);
        tempchild.appendChild(tempBudgCostAlloc);
        div_leftBudgetContainer.appendChild(tempchild);
    }
}

function expenseReload()
{
//remove all elements with classes indicating they are dependent on expense data
removeElementsByClass("expenseDpd"); 
}