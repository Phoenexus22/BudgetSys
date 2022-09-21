//returns an array of only the elements with a parent id of null
Array.prototype.primeParents = function(){
    let accArray = [];
    for (let i = 0; i < this.length; i++)
    {
        if(this[i].parentBudgId == null) accArray.push(this[i]);
    }
    return accArray;
}

//sorts the array bay name (ascending)
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
//sorts the array by timestamp (ascending)
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

Array.prototype.addDbObject = function(dbobject)
{
    this[this.push(dbobject) -1].firesend();
}
var debugMode = false;