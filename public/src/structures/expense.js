class expense
{
    constructor(name = "N/A", description = "N/A", cost = 0.0, to = "Undisclosed", date = "dd-mm-yyyy", signatory = "Undisclosed", budgID = "lost")
    {
        this.id = randId();
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.to = to;
        this.date = date;
        this.signatory = signatory;
        this.budgID = budgID;
    }

    parent()
    {
        return searchId(budgets, this.budgId);
    }

    firesend()
    {
        db.collection("expenses").doc(this.id).set(
        {
            id: this.id,
            name: this.name,
            description: this.description,
            cost: this.cost,
            to: this.to,
            date: this.date,
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