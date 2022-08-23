Array.prototype.primeParents = function(){
    let accArray = [];
    for (let i = 0; i < this.length; i++)
    {
        if(this[i].parentBudgId == null) accArray.push(this[i]);
    }
    return accArray;
}

Array.prototype.sortByName = function()
{
    try{
        this.sort(function (first, second) {
            if (first.name < second.name) {
            return -1;
            }
            if (first.name > second.name) 
            {
            return 1;
            }
            return 0;
        });
    }
     catch
    {
        console.error("Array elements have no field name");
    }
}

Array.prototype.sortByTimestamp = function()
{
    try{
        this.sort(function (first, second) {
            if (first.timestamp < second.timestamp) {
            return -1;
            }
            if (first.timestamp > second.timestamp) 
            {
            return 1;
            }
            return 0;
        });
    }
    catch
    {
        console.error("Array elements have no field timestamp");
    }
}