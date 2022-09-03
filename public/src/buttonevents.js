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
