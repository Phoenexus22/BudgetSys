function startBudgetListener()
{
   db.collection("budgets").onSnapshot((snapshot) => { // event that runs when database is changed
        budgets.length=0;
        snapshot.forEach((doc) => {
            const object = new budget(doc.data().name, doc.data().description, doc.data().allocatedCost, doc.data().renewDate, doc.data().parentBudgId);
            object.id = doc.data().id;
            object.currentCost = doc.data().currentCost;
            object.subBudgIds = doc.data().subBudgIds;
            object.expenseIds = doc.data().expenseIds;

            budgets.push(object);//adding all documents into array
      })
      //redo html
  })
}

function startExpenseListener()
{
    db.collection("expenses").onSnapshot((snapshot) => { // event that runs when database is changed
        expenses.length=0;
        snapshot.forEach((doc) => {
            const object = new expense(doc.data().name, doc.data().description, doc.data().cost, doc.data().to, doc.data().date, doc.data().signatory, doc.data().budgId);
            object.id = doc.data().id;
            expenses.push(object);//adding all documents into array
      })
      //redo html
  })
}