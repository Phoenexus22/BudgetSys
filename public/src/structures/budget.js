class budget
{

    //used to create the fields of budget object 
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

    //calculates the cost of this budget and all sub budgets
    async calcCurrent()
    {
        this.currentCost = 0;
        for(let i = 0; i < this.children().length; i++)
        {
            let currBudg = this.children()[i];
            currBudg.calcCurrent();
            this.currentCost+=parseInt(currBudg.currentCost, 10);
        }
        console.log(this.expenses());
        for(let i = 0; i < this.expenses().length; i++)
        {
            this.currentCost+=parseInt(this.expenses()[i].cost, 10);
        }
        await this.firesend();
    }


    //returns true when current cost is less than allocated cost
    inBlack()
    {
        return (this.currentCost <= this.allocatedCost);
    }



    //returns the parent object of this budget, defined by the parentBudgId
    parent()
    {
        return searchId(budgets, this.parentBudgId);
    }

    //returns the parent of the parent of the... you get the idea
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

    //returns the index of this objects id in the parent's subBudgIds
    indexInParent()
    {
        let parentChildren = this.parent().children();
        for(let i = 0; i < parentChildren.length; i++)
        {
            if(parentChildren[i].id == this.id) return i;
        }
    }


    //returns the array of children for this object
    children()
    {
        let temparray  = [];
        for(let i = 0; i < this.subBudgIds.length;i++ )
        {   
            temparray.push(searchId(budgets, this.subBudgIds[i]));      
        }
        return temparray;
    }

    //adds a subbudget to a budget
    async addChild(child)
    {
        this.subBudgIds.push(child.id);
        child.parentBudgId = this.id;
        await child.firesend();
        await this.firesend();
        await this.primeParent().calcCurrent();
    }

    //removes all subbudgets
    purgeChildren()
    {
        let children = this.children();
        for (let i = 0; i < children.length; i++)
        {
            children[i].delete()
        }
    }


    //returns the array of expenses for this object 
    expenses()
    {
        let temparray  = [];
        for(let i = 0; i < this.expenseIds.length;i++ )
        {   
            temparray.push(searchId(expenses, this.expenseIds[i]));      
        }
        return temparray;
    }

    //adds an expense to this budget
    async addExpense(expense)
    {
        this.expenseIds.push(expense.id);
        expense.budgId = this.id;
        await expense.firesend();
        await this.firesend();
        await this.primeParent().calcCurrent();//this is running before the expense firesend fully fixes itself
    }

    //removes all expenses from this budget
    purgeExpenses()
    {
        let expenses = this.expenses();
        for (let i = 0; i < expenses.length; i++)
        {
            expenses[i].delete();
        }
    }

    percentFull()
    {
        return (this.currentCost / this.allocatedCost) * 100;
    }

    costFromChildren()
    {
        let accum = 0;
        let tempchild = this.children();
        for (let i = 0; i < tempchild.length; i++)
        {
            accum+=tempchild[i].currentCost;
        }
        return accum;
    }

    allocFromChildren()
    {
        let accum = 0;
        let tempchild = this.children();
        for (let i = 0; i < tempchild.length; i++)
        {
            accum+=parseInt(tempchild[i].allocatedCost, 10);
        }
        return accum;
    }


    //removes all reference to this budget, and deletes its children and expenses
    delete()
    {
        this.purgeExpenses();
        this.purgeChildren();
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

    //send the copy of this object to the database
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