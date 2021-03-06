function formatDate (timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours <10) {hours=`0${hours}`};
    let minutes = date.getMinutes();
    if (minutes <10) {minutes = `0${minutes}`};
    let days = ["sunday", "monday", "tuesday", "wednesday","thursday","friday", "saturday"];
    let day = days[date.getDay()];
    return ` ${day} ${hours}:${minutes}`; 
}

function formatDay(timestamp) {
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
          forecastHTML = forecastHTML + 
        `
        <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" id="img" alt=""/>
                <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°   </span>
                    <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)} ° </span>
                </div>
            </div>
    `;
     }
     })
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "c464dd164b44484161303b9f1d1f0121";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}

function displayCurrentDate (response) {
      let dateElement = document.querySelector("#date");
      dateElement.innerHTML= formatDate(response.data.dt * 1000);
    
}
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector(".weather-description");
    let windElement = document.querySelector("#wind");
    let countryElement=document.querySelector("#country");
  
    let iconElement = document.querySelector("#forecast-icon");
    let minElement = document.querySelector("#value-min");
    let maxElement = document.querySelector("#value-max");
    let humidityElement = document.querySelector("#value-humidity");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML= response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed); 
    countryElement.innerHTML=response.data.sys.country;
    
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt", response.data.weather[0].description);
    minElement.innerHTML=Math.round(response.data.main.temp_min) + "°";
    maxElement.innerHTML=Math.round(response.data.main.temp_max) + "°";
    humidityElement.innerHTML=Math.round(response.data.main.humidity) +"%";

    getForecast(response.data.coord);

}

function formatHours (timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours <10) {hours=`0${hours}`};
    let minutes = date.getMinutes();
    if (minutes <10) {minutes = `0${minutes}`};
    return `${hours}:${minutes}`
}

function search(city) {
let apiKey = "c464dd164b44484161303b9f1d1f0121";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit (event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search ("Sydney"); 

function searchLocation(position) {
    let apiKey = "c464dd164b44484161303b9f1d1f0121";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
axios.get(apiUrl).then(displayCurrentDate);
}

function getCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);







