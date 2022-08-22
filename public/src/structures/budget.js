class budget
{
    constructor(name = "N/A", description = "N/A", allocatedCost = 0.0, renewDate = "dd-mm-yyyy", parentBudgId = null)
    {
        this.id = randId(budgets);
        this.name = name;
        this.description = description;
        this.allocatedCost = allocatedCost;
        this.currentCost = 0.0;
        this.renewDate = renewDate;
        this.subBudgIds = [];
        this.expenseIds = [];
        this.parentBudgId = parentBudgId;
    }

    calcCurrent()
    {
        this.currentCost = 0;
        for(let i = 0; i < this.children().length; i++)
        {
            let currBudg = this.children()[i];
            currBudg.calcCurrent();
            this.currentCost+=currBudg.currentCost;
        }
        for(let i = 0; i < this.expenses().length; i++)
        {
            this.currentCost+=this.expenses()[i].cost;
        }
        this.firesend();
    }

    parent()
    {
        return searchId(budgets, this.parentBudgId);
    }

    children()
    {
        let temparray  = [];
        for(let i = 0; i < this.subBudgIds.length;i++ )
        {   
            temparray.push(searchId(budgets, this.subBudgIds[i]));      
        }
        return temparray;
    }

    addChild(child)
    {
        this.subBudgIds.push(child.id);
        child.parentBudgId = this.id;
        child.firesend();
        this.firesend();
    }

    expenses()
    {
        let temparray  = [];
        for(let i = 0; i < this.expenseIds.length;i++ )
        {   
            temparray.push(searchId(expenses, this.expenseIds[i]));      
        }
        return temparray;
    }

    addExpense(expense)
    {
        this.expenseIds.push(expense.id);
        expense.budgId = this.id;
        expense.firesend()
        this.firesend()
    }


    firesend()
    {
        db.collection("budgets").doc(this.id).set(
        {
            id: this.id,
            name: this.name,
            description: this.description,
            allocatedCost: this.allocatedCost,
            currentCost: this.currentCost,
            renewDate: this.renewDate,
            subBudgIds: this.subBudgIds,
            expenseIds: this.expenseIds,
            parentBudgId: this.parentBudgId

        }).then(() => 
        {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
         });
    }

}