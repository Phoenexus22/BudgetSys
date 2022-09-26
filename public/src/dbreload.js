function budgetReload()
{
    //remove all elements with classes indicating they are dependent on budget data
    removeElementsByClass("budgDpd"); 
    remakeBudgetBar();
    changeBudgetPage(viewedBudget);
}

function remakeBudgetBar()
{
    if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
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
    var plusexpense = document.createElement("div");
    plusexpense.classList.add("fillx");
    plusexpense.classList.add("cflex");
    plusexpense.classList.add("budgDpd");
    plusexpense.classList.add("centercontent");
    plusexpense.classList.add("basicborder");
    plusexpense.classList.add("leftbudget");
    plusexpense.classList.add("hovclick_lightblue");

    var plusimg = document.createElement("img");
    plusimg.src = "src/images/plus.svg";
    plusimg.style.height = "10rem";
    plusimg.style.width = "4rem";
    plusexpense.appendChild(plusimg);

    plusexpense.addEventListener('click', function (){budgetToggleVar = selectedBudget; toggleNewBudget();});

    div_leftBudgetContainer.appendChild(plusexpense);
}


function expenseReload()
{
    //if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
//remove all elements with classes indicating they are dependent on expense data
removeElementsByClass("expenseDpd");
remakeExpenseTable(); 
}

function remakeExpenseTable()
{
    if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
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

        let options = document.createElement("td");
        let deletebutton = document.createElement("img");
        deletebutton.src = "src/images/trash.svg"
        deletebutton.value = expn[i].id;
        deletebutton.addEventListener('click', function (){if (confirm("Are you sure you want to delete this transaction?"))searchId(expenses, this.value).delete()});
        options.appendChild(deletebutton);
        row.appendChild(options);



        table_expensetable.appendChild(row);
    }
}