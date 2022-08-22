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
}