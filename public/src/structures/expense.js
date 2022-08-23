class expense
{
    constructor(name = "N/A", description = "N/A", cost = 0.0, to = "Undisclosed", signatory = "Undisclosed", timestamp = Date.now(), budgeID = null)
    {
        this.id = randId();
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.to = to;
        this.timestamp = timestamp;
        this.signatory = signatory;
        this.budgId = budgeID;
    }

    delete()
    {
        this.parent().expenseIds.splice(this.indexInParent(), 1);
        this.primeParent().calcCurrent();
        db.collection("expenses").doc(this.id).delete().then(() => {
            //runs on success
          console.log(this.id + " successfully deleted!");
        }).catch((error) => {
            //runs on failure
          console.error("Error removing document: ", error);
      });
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

    indexInParent()
    {
        let parentChildren = this.parent().expenses();
        for(let i = 0; i < parentChildren.length; i++)
        {
            if(parentChildren[i].id == this.id) return i;
        }
    }
    
    

    parent()
    {
        return searchId(budgets, this.budgId);
    }

    async firesend()
    {
        await db.collection("expenses").doc(this.id).set(
        {
            id: this.id,
            name: this.name,
            description: this.description,
            cost: this.cost,
            to: this.to,
            timestamp: this.timestamp,
            signatory: this.signatory,
            budgId: this.budgId

        }).then(() => 
        {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
         });
    }
}