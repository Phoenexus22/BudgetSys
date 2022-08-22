class budget
{
    constructor(name = "N/A", description = "N/A", allocatedCost = 0.0)
    {
        this.id = randId();
        this.name = name;
        this.description = description;
        this.allocatedCost = allocatedCost;
        this.currentCost = 0.0;
        this.renewDate = renewDate;
        this.subBudgets = [];
        this.expenses = [];
    }

    calcCurrent()
    {
        this.currentCost = 0;
        for(i = 0; i < this.subBudgets.length; i++)
        {
            this.subBudgets[i].calcCurrent();
            this.currentCost+=this.subBudgets[i].currentCost;
        }
        for(i = 0; i < this.expenses.length; i++)
        {
            this.currentCost+=this.expenses[i].cost;
        }

    }
}