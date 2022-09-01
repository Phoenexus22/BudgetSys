    function changeBudgetPage(id)
    {
        viewedBudget = id;
        let chosenbudget = searchId(budgets, id);
        h2_budgetHeader.innerHTML  = chosenbudget.name; 
        a_budgetCostandAll.innerHTML = `$${chosenbudget.currentCost}/$${chosenbudget.allocatedCost}`;
        span_currentSubbudgCost.innerHTML = `$${chosenbudget.costFromChildren()}`
        remakeExpenseTable();
    }