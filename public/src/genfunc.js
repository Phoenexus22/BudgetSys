
//returns a random base 64 number that is not already in an array
function randId(sourceArray = [], startlength = "20")
{
    tryagain: while (true){
        let id = randb64(startlength)
     
        for(let i = 0; i < sourceArray.length; i++)
        {
            if (sourceArray[i].id == id){;continue tryagain; }
        }
        return id;
    }
}

//returns a random base 64 number
function randb64(length) 
{
    var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

//searches arrays for ids and returns the object that owns it
function searchId(sourceArray = [], id = null)
{
    for (let i = 0; i < sourceArray.length; i++)
    {
        if (sourceArray[i].id == id) return sourceArray[i];
    }
    return null;
}

//removes any html element with the class specified
function removeElementsByClass(className)
{
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
 }