const API_KEY = "c2d5c880-fd6d-4464-90d0-ecdb6c177cda"
const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
const url2 = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`

const BtnHandler = () => {
    console.log("handle click event");
};

const getCountries = async () =>  {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}
// getCountries()

const renderCountries = async () => {
    try {
        const data = await getCountries()
        const countriesList = document.querySelector("#countries-list")
        const ulcountriesList = countriesList.children[2]
        console.log(ulcountriesList)
        ulcountriesList.innerHTML = ""
        data.countries.forEach((country,index) => {
            const elementLi = document.createElement("li")
            elementLi.innerHTML = 
            `<div class="bullet">${index}</div>
            <div class="li-wrapper">
            <div class="li-title">${country.name}</div>
            <div class="li-text">${country.code}</div>
            </div>`
            ulcountriesList.appendChild(elementLi)
        })
    } catch (error) {
        console.log(error)
    }
}
document.querySelector("#countries-list-btn").addEventListener("click", () => {
    renderCountries();
})

const getLanguages = async () => {
    try {
        const res = await fetch(url2)
        const data2 = await res.json()
        return data2;
    } catch (error) {
        console.log(error)
    }
}
getLanguages()

const renderLanguages = async () => {
    try {
        const data2 = await getLanguages()
        const languagesList = document.querySelector("#languages-list")
        const ullanguagesList = languagesList.children[2]
        ullanguagesList.innerHTML = ""
        data2.languages.forEach((language,index) => {
            const elementLi = document.createElement("li")
            elementLi.innerHTML = 
            `<div class="bullet">${index}</div>
            <div class="li-wrapper">
            <div class="li-title">${language.name}</div>
            <div class="li-text">${language.code}</div>
            </div>`
            ullanguagesList.appendChild(elementLi)
        })
    } catch (error) {
        console.log(error)
    }
}

document.querySelector("#languages-list-btn").addEventListener("click", () => {
    renderLanguages();
})


const search = document.getElementById("search-query");
const year = document.getElementById("year-query");
const month = document.getElementById("month-query");
const day = document.getElementById("day-query");
const country = document.getElementById("country-query");
const language = document.getElementById("language-query");

const getHolidates = async () => {
    try {
        let queryString = ""
        if(search.value){
            queryString += `&search=${search.value}`
        }
        if(year.value){
            queryString += `&year=${year.value}`
        } else {
            queryString += `&year=2023`;
        }
        if(month.value){
            queryString += `&month=${month.value}`
        }
        if(day.value){
            queryString += `&day=${day.value}`
        }
        if(country.value){
            queryString += `&country=${country.value}`
        } else {
            queryString += `&country=`;
        }
        if(language.value){
            queryString += `&language=${language.value}`
        }

        const res = await fetch(`https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${queryString}`)
        const data = await res.json()
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}
// getHolidates()

const renderHolidates = async () => {
    try {
      const data = await getHolidates()
      const listHolidates = document.querySelector("#holidays-list")
      const ulHolidates = listHolidates.children[1]
      ulHolidates.innerHTML = ""
      data.holidays.forEach((holiday,index) => {
        const elementLi = document.createElement("li")
        elementLi.innerHTML = `<li>
        <div class="bullet">${index}</div>
        <div class="li-wrapper">
        <div class="li-title">${holiday.name}</div>
        <div class="li-text">${holiday.weekday.date.name} - ${holiday.date}</div>
        </div>
      </li>`
      ulHolidates.appendChild(elementLi)
      })
    } catch (error) {
      console.log("error");
    }
  };

document.querySelector("#holidays-btn").addEventListener("click", () => {
    renderHolidates()
    if(search.value){
        if(country.value){
            renderCountries(country.value)
        } else {
            holidayCountryTittle.textContent = "Holidays of all countries"
        }
    }
    if (!search.value) {
        if (country.value) {
          renderCurrentCountryName(country.value);
        } else {
          renderCurrentCountryName();
        }
      }
})




const queryCountryName = async (countryCode) => {
    try {
      const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}&country=${countryCode}`;
      const res = await fetch(url);
      const data = await res.json();
      const countries = data["countries"];
    //   console.log(countries);
      return countries;
    } catch (error) {
      console.log("error", error.message);
    }
  };
//   queryCountryName("VN").then((name) => console.log(name));

const renderCurrentCountryName = async (countryCode = "VN") => {
    try {
        const countryList = await queryCountryName(countryCode)
        countryName = countryList[0].name
        const holidayDiv = document.getElementById("holidays-list");
        const holidayCountryTittle = holidayDiv.children[0];
        if(countryName){
            holidayCountryTittle.textContent = `Holiday of ${countryName}`;
        }
    } catch (error) {
        console.log(error)
    }
}