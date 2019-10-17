//In the case we need to call an API like Alex, practice calling API in Javascript
//This calls a free api to return a json. could be helpful in database usage


const convertResponseToJson = function (r) {
    return r.json();
}

for (let j = 0; j < len; j++) {
    fetch("https://numbersapi.p.rapidapi.com/6/21/date?fragment=true&json=true", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
            "x-rapidapi-key": "9f359b9b87msh946b2e53dab9bc6p105233jsn541bdc9352b9"
        }
    })
        .then(convertResponseToJson)
        .then((d) => {
            
            console.log("Got some data", d);
        });
    }
