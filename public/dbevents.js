function updateIngredients()
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