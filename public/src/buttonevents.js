    function changeBudgetPage(id)
    {
        viewedBudget = id;
        let chosenbudget = searchId(budgets, id);
        h2_budgetHeader.innerHTML  = chosenbudget.name; 
        a_budgetCostandAll.innerHTML = `$${chosenbudget.currentCost}/$${chosenbudget.allocatedCost}`;
        span_currentSubbudgCost.innerHTML = `$${chosenbudget.costFromChildren()}`
        remakeExpenseTable();
    }

    function changeCurrentBudget()
    {
        if (searchId(budgets, viewedBudget).children().length > 0){
        console.log(searchId(budgets, selectedBudget));
        selectedBudget = viewedBudget;//set input name to ingredient name
        console.log(searchId(budgets, selectedBudget));
        remakeBudgetBar();
        changeBudgetPage(searchId(budgets, selectedBudget).subBudgIds[0]);
        }
    }

    function backBudget()
    {
        if(selectedBudget != null){
            selectedBudget = (searchId(budgets, selectedBudget).parent()==null)?null:searchId(budgets, selectedBudget).parent().id;
            remakeBudgetBar();
            changeBudgetPage((selectedBudget==null)?budgets.primeParents()[0].id:searchId(budgets, selectedBudget).subBudgIds[0]);
        }
    }

    function submitNewBudget()
    {
        let parent = searchId(budgets, viewedBudget);
        parent.addChild(new budget(input_newbudgetname.value, input_newbudgetdesc.value, input_newbudgetalloc.value, input_newbudgetdate.value));
        input_newbudgetname.value = input_newbudgetdesc.value = input_newbudgetalloc.value = input_newbudgetdate.value = "";
        toggleNewBudget();
    }

    function toggleNewBudget()
    {
        (div_addbudgetbox.style.display ==  "none")? div_addbudgetbox.style.display = "flex":div_addbudgetbox.style.display = "none";
        (div_addoverlay.style.display == "none")? div_addoverlay.style.display = "block":div_addoverlay.style.display = "none";
    }
