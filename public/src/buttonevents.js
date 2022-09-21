    function changeBudgetPage(id)
    {
        if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        viewedBudget = id;
        let chosenbudget = searchId(budgets, id);
        h2_budgetHeader.innerHTML  = chosenbudget.name; 
        a_budgetCostandAll.innerHTML = `$${chosenbudget.currentCost}/$${chosenbudget.allocatedCost}`;
        console.log(chosenbudget.allocFromChildren());
        span_currentSubbudgCost.innerHTML = `$${chosenbudget.costFromChildren()}/$${chosenbudget.allocFromChildren()}`
        remakeExpenseTable();
    }

    function changeCurrentBudget()
    {
        if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
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
        if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        if(selectedBudget != null){
            selectedBudget = (searchId(budgets, selectedBudget).parent()==null)?null:searchId(budgets, selectedBudget).parent().id;
            remakeBudgetBar();
            changeBudgetPage((selectedBudget==null)?budgets.primeParents()[0].id:searchId(budgets, selectedBudget).subBudgIds[0]);
        }
    }

    function submitNewBudget()
    {
        if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        let parent = searchId(budgets, budgetToggleVar);
        if (parent == null)
        {
            budgets.addDbObject(new budget(input_newbudgetname.value, input_newbudgetdesc.value, input_newbudgetalloc.value, input_newbudgetdate.value))
        }
        else{
            if ((parent.allocFromChildren() + input_newbudgetalloc.value)>parent.allocatedCost)
            {
                alert("the combined cost allocation of sub budgets cannot exceed the parent cost allocation")
                return 0;
            }
            parent.addChild(new budget(input_newbudgetname.value, input_newbudgetdesc.value, input_newbudgetalloc.value, input_newbudgetdate.value));
        }
       exitToggleBudget();
    
    }

    function submitNewExpense()
    {
        if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        let parent = searchId(budgets, viewedBudget);
        parent.addExpense(new expense(input_newexpensename.value, input_newexpensedesc.value, input_newexpensecost.value, input_newexpenseto.value, input_newexpensesignatory.value));
        input_newexpensename.value = input_newexpensedesc.value = input_newexpensecost.value = input_newexpenseto.value = input_newexpensesignatory.value = "";
        toggleNewExpense();
    }

    function toggleNewBudget()
    {if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        (div_addbudgetbox.style.display ==  "none")? div_addbudgetbox.style.display = "flex":div_addbudgetbox.style.display = "none";
        (div_addoverlay.style.display == "none")? div_addoverlay.style.display = "block":div_addoverlay.style.display = "none";
    }

    function exitToggleBudget()
    {if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        budgetToggleVar = null;
        input_newbudgetname.value = input_newbudgetdesc.value = input_newbudgetalloc.value = input_newbudgetdate.value = "";
        toggleNewBudget()
    }


    function inPageBudgetCall()
    {if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        budgetToggleVar = viewedBudget;
        toggleNewBudget();
    }

    function toggleNewExpense()
    {if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        (div_addexpensebox.style.display ==  "none")? div_addexpensebox.style.display = "flex":div_addexpensebox.style.display = "none";
        (div_addoverlay.style.display == "none")? div_addoverlay.style.display = "block":div_addoverlay.style.display = "none";
    }

    function deleteBudget()
    {if(debugMode)console.log(`${arguments.callee.name}, ${this}`);
        if (!confirm("Are you sure you want to delete this budget?\nthis will remove all transactions and sub-budgets")) return 0;
        searchId(budgets, viewedBudget).delete();
    }
