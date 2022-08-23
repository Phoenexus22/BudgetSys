function testExpense()
{
    return new expense(Math.floor(Math.random() * 2000), Math.floor(Math.random() * 2000), Math.floor(Math.random() * 100),  Math.floor(Math.random() * 2000), Math.floor(Math.random() * 2000));
}

function testBudget()
{
    return new budget(Math.floor(Math.random() * 2000), Math.floor(Math.random() * 2000), Math.floor(Math.random() * 20000), Math.floor(Math.random() * 2000));
}