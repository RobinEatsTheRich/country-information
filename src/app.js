import axios from "axios";

////////////////////////////////---PSEUDOCODE PART 1---////////////////////////////////
//Install Axios somehow
//https://restcountries.com/v3.1/name/{country} / {all}?
//https://restcountries.com/v3.1/flag/{country} / {all}?
//https://restcountries.com/v3.1/population/{country} / {all}?

//getElement countryList, for each Country in Rest countries API, add following code:
//Display country/flag, display country/name and the Class is the continent. so I can easily call them in Stylesheet
//Then Display `Has a population of ${country/flag} people`
//if Region is Americas, do nAmerica if subregion is North America or Central America, do sAmerica if subregion is South America


////////////////////////////////---PSEUDOCODE PART 2---////////////////////////////////
//Add some endpoints, so I have access to the Capital and Currencies as well.
//Write HTML element for search bar and add event listener for when you press search.
//Add search field text as an argument to the event listener, and search in database for it.
//Add all this within a Catch, that inserts an HTML element for an error.
//Once found, insert HTML with big flag, country name, and then some text with subarea, population, and the capital.
//Add the first currency part: "you can pay with []" and open a For loop.
//Default: for each loop where, until i === currencies.length, add ", []" and if it's the last currency, add "and []" and break.
//Repeat above step but for languages.





// function listCountries(countryLibrary, uiElement){
//     countryLibrary.map((country) =>{
//         uiElement.innerHTML += `
//         <div class="countrySummary">
//             <div class="summaryTopRow">
//                 <img class="countryFlag" src=${antarcticaDeservesItsProperFlag(country)} alt="flag">
//                 <h4 class="countryName ${getContinent(country)}">${country.name.common}</h4>
//             </div>
//             <p class="countryPopulation">has a population of <span class="populationNumber">${country.population}</span> people</p>
//         </div>
//         `;
//     })
// }
function displayInfo(countryLibrary, countryQuery, uiElement) {
    console.log(`Searching...`)
    const country = countryLibrary.find(obj => {
        return obj.name.common.toLowerCase() === countryQuery.toLowerCase()
    })
    if (countryQuery.toLowerCase() === "antarctica"){
        uiElement.innerHTML = `
            <div class="displayContainer">
                <div class="summaryTopRow">
                    <img class="countryFlag" src=${antarcticaDeservesItsProperFlag(country)} alt="flag">
                    <h3 class="countryName ${getContinent(country)}">${country.name.common}</h3>
                </div>
                <div class="summaryBottomRow">
                    <p>${country.name.common} is situated in the ${country.region}. It has a population of ${country.population} people.</p>
                    <p>Used mostly as a research basis they have neither an official capital, currency, nor language.</p>
                </div>            
            </div>    
        `
    }
    else if (country){
        uiElement.innerHTML = `
            <div class="displayContainer">
                <div class="summaryTopRow">
                    <img class="countryFlag" src=${antarcticaDeservesItsProperFlag(country)} alt="flag">
                    <h3 class="countryName ${getContinent(country)}">${country.name.common}</h3>
                </div>
                <div class="summaryBottomRow">
                    <p>${country.name.common} is situated in ${country.subregion}. It has a population of ${country.population} people.</p>
                    <p>Their capital is ${country.capital} and you can pay with ${currencySemantics(country)}.</p>
                    <p>The inhabitants speak ${languageSemantics(country)}.</p>                
                </div>            
            </div>    
        `
    }
    else if (countryQuery === ""){
        uiElement.innerHTML = `   
    `;
    }
    else {
    uiElement.innerHTML = `
        <div class="errorContainer">
            <h3>No results found :(</h3>
            <p>Looks like "${countryQuery}" is not in our system</p>
        </div>    
    `;
    }
}
function antarcticaDeservesItsProperFlag(country){
    if (country.name.common === "Antarctica") return "https://upload.wikimedia.org/wikipedia/commons/f/f8/True_South_Antarctic_Flag.svg"
    else return country.flags.svg;
}

function getContinent(country){
    if (country.region.toLowerCase() === "americas"){
        if (country.subregion.toLowerCase() === "south america") return "sAmerica";

        else return "nAmerica";
    }
    else return country.region.toLowerCase();
}
function currencySemantics(country){
    const currencyArray = Object.values(country.currencies);
    let returnString = `${currencyArray[0].name}s`;
    for (let i = 0; i < currencyArray.length; i++) {
        if (i !== 0 && i === (currencyArray.length - 1)) {
            returnString += ` and ${currencyArray[i].name}s`;
        } else if (i !== 0 && i < (currencyArray.length)) {
            returnString += `, ${currencyArray[i].name}s`;
        }
    }
    return returnString;
}
function languageSemantics(country){
    const languageArray = Object.values(country.languages);
    console.log(languageArray)
    let returnString = `${languageArray[0]}`;
    for (let i = 0; i < languageArray.length; i++) {
        if (i !== 0 && i === (languageArray.length - 1)) {
            returnString += ` and ${languageArray[i]}`;
        } else if (i !== 0 && i < (languageArray.length)) {
            returnString += `, ${languageArray[i]}`;
        }
    }
    return returnString;
}

//const countryListElement = document.getElementById('countryList')
const countryDisplayElement = document.getElementById('countryDisplay')
const textElement = document.getElementById('countryQueryText')
async function fetchCountries() {
    console.log(`Fetching Countries...`)
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,currencies,languages')
        response.data.sort((a, b) => {
         if (a.population > b.population) return 1;
        });
        //listCountries(response.data, countryListElement);
        displayInfo(response.data, textElement.value, countryDisplayElement);
        console.log(`textElement = ${textElement} and its contents are ${textElement.value}`)
        console.log(`Fetched Countries`)

    } catch (e){
        console.error(e)
    }
}

const buttonElement = document.getElementById('countryQueryButton');
buttonElement.addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    console.log("event listener activated")
    fetchCountries();
}