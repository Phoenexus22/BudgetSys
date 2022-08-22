

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

function randb64(length) {
    var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

function searchId(sourceArray = [], id = null)
{
    for (let i = 0; i < sourceArray.length; i++)
    {
        if (sourceArray[i].id == id) return sourceArray[i];
    }
}