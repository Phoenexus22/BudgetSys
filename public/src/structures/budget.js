class budget
{
    constructor(name = "N/A", description = "N/A", allocatedCost = 0.0, renewDate = "dd-mm-yyyy", parentBudgId = null)
    {
        this.id = randId();
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
        for(let i = 0; i < this.subBudgets.length; i++)
        {
            let currBudg = searchId(budgets, this.subBudgIds[i]);
            currBudg.calcCurrent();
            this.currentCost+=currBudg.currentCost;
        }
        for(let i = 0; i < this.expenses.length; i++)
        {
            this.currentCost+=searchId(expenses, this.expenses[i].id).cost;
        }
    }

    parent()
    {
        return searchId(budgets, this.parentBudgId);
    }

    // children()
    // {
    //     let temparray  = [];
    //     for(let i = 0; i < this.subBudgIds.length;i++ )
    //     {
    //         if (budgets[i].id = this.subBudgIds[i].id)temparray.push()
    //     }
    // }
}