import axios from "axios";

////////////////////////////////---PSEUDOCODE---////////////////////////////////
//Install Axios somehow
//https://restcountries.com/v3.1/name/{country} / {all}?
//https://restcountries.com/v3.1/flag/{country} / {all}?
//https://restcountries.com/v3.1/population/{country} / {all}?

//getElement countryList, for each Country in Restcountries API, add following code:
//Display country/flag, display country/name and the Class is the continent. so I can easily call them in Stylesheet
//Then Display `Has a population of ${country/flag} people`
//if Region is Americas, do nAmerica if subregion is North America or Central America, do sAmerica if subregion is South America



function listCountries(countryLibrary, uiElement){
    countryLibrary.map((country) =>{
        uiElement.innerHTML += `
        <div class="countrySummary">
            <div class="summaryTopRow">
                <img class="countryFlag" src=${antarticaDeservesItsProperFlag(country)} alt="flag">
                <h4 class="countryName ${getContinent(country)}">${country.name.common}</h4>
            </div>
            <p class="countryPopulation">has a population of <span class="populationNumber">${country.population}</span> people</p>
        </div>
        `;
    })
}

function antarticaDeservesItsProperFlag(country){
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

const countryListElement = document.getElementById('countryList')
async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion')
        response.data.sort((a, b) => {
         if (a.population > b.population) return 1;
        });
        listCountries(response.data, countryListElement);

    } catch (e){
        console.error(e)
    }
}

void fetchCountries();
