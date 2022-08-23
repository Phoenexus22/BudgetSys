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

    async calcCurrent()
    {
        this.currentCost = 0;
        for(let i = 0; i < this.children().length; i++)
        {
            let currBudg = this.children()[i];
            currBudg.calcCurrent();
            this.currentCost+=currBudg.currentCost;
        }
        console.log(this.expenses());
        for(let i = 0; i < this.expenses().length; i++)
        {
            this.currentCost+=this.expenses()[i].cost;
        }
        await this.firesend();
    }

    inBlack()
    {
        return (this.currentCost <= this.allocatedCost);
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

    primeParent()
    {
        let parentAcc = this;
        let parentTst = this.parent();
        while (parentTst)
        {
            parentAcc = parentAcc.parent();
            parentTst = parentTst.parent();
        }
        return parentAcc
    }

    async addChild(child)
    {
        this.subBudgIds.push(child.id);
        child.parentBudgId = this.id;
        await child.firesend();
        await this.firesend();
        await this.primeParent().calcCurrent();
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

    async addExpense(expense)
    {
        this.expenseIds.push(expense.id);
        expense.budgId = this.id;
        await expense.firesend();
        await this.firesend();
        await this.primeParent().calcCurrent();//this is running before the expense firesend fully fixes itself
    }


    delete()
    {
        let expenses = this.expenses();
        let children = this.children();
        for (let i = 0; i < expenses.length; i++)
        {
            expenses[i].delete();
        }
        for (let i = 0; i < children.length; i++)
        {
            children[i].delete()
        }
        if(this.parent()) this.parent().subBudgIds.splice(this.indexInParent(), 1);
        this.primeParent().calcCurrent();
        db.collection("budgets").doc(this.id).delete().then(() => {
            //runs on success
          console.log(this.id + " successfully deleted!");
        }).catch((error) => {
            //runs on failure
          console.error("Error removing document: ", error);
      });
    }

    indexInParent()
    {
        let parentChildren = this.parent().children();
        for(let i = 0; i < parentChildren.length; i++)
        {
            if(parentChildren[i].id == this.id) return i;
        }
    }

    async firesend()
    {
        await db.collection("budgets").doc(this.id).set(
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