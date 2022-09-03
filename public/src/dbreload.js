function budgetReload()
{
    //remove all elements with classes indicating they are dependent on budget data
    removeElementsByClass("budgDpd"); 
    remakeBudgetBar();
}

function remakeBudgetBar()
{
    removeElementsByClass("leftbudget");
    arrayofChoice = (selectedBudget==null)?budgets.primeParents():searchId(budgets, selectedBudget).children();
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

        tempchild.value = arrayofChoice[i].id;
        tempchild.addEventListener('click', function (){changeBudgetPage(arrayofChoice[i].id)});

        var tempBudgName = document.createElement("a");
        tempBudgName.classList.add("semibold");
        tempBudgName.classList.add("capital");
        tempBudgName.innerHTML = arrayofChoice[i].name;
        var tempBudgCostAlloc = document.createElement("a");
        tempBudgCostAlloc.innerHTML = `$${arrayofChoice[i].currentCost}/$${arrayofChoice[i].allocatedCost}`;

        tempBudgCostAlloc.classList.add((arrayofChoice[i].percentFull() > 100)?"tx_red":(arrayofChoice[i].percentFull() > 75)?"tx_orange":"tx_black");
        tempBudgCostAlloc.classList.add("medbold");
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

function remakeExpenseTable()
{
    let curbudg  = searchId(budgets, viewedBudget);
    let expn = curbudg.expenses();
    removeElementsByClass("expenseTableRow");
    for (let i = 0; i < expn.length; i++ )
    {
        let row = document.createElement("tr");
        row.classList.add("expenseTableRow");
        row.classList.add("expenseDpd");

        let tname = document.createElement("td");
        tname.innerHTML = expn[i].name;
        row.appendChild(tname)

        let desc = document.createElement("td");
        desc.innerHTML = expn[i].description;
        row.appendChild(desc)

        let cost = document.createElement("td");
        cost.innerHTML = `$${expn[i].cost}`;
        row.appendChild(cost)

        let recip = document.createElement("td");
        recip.innerHTML = expn[i].to;
        row.appendChild(recip)

        let time = document.createElement("td");
        time.innerHTML = new Date(expn[i].timestamp);
        row.appendChild(time)

        let auth = document.createElement("td");
        auth.innerHTML = expn[i].signatory;
        row.appendChild(auth)

        table_expensetable.appendChild(row);
    }
}