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

function formattedDate (timestamp) {
    let date = new Date (timestamp);
    let sunriseDate = new Date (timestamp);
    let hours = sunriseDate.getHours();
     if (hours <10) {hours=`0${hours}`};
    let minutes = date.getMinutes();
    if (minutes <10) {minutes = `0${minutes}`};
    return `${hours}:${minutes}`;
}

function formattedDateSunset (timestamp) {
    let date = new Date (timestamp);
    let sunsetDate = new Date (timestamp);
    let hour = sunsetDate.getHours();
    let minutes = date.getMinutes();
    return `${hour}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector(".weather-description");
    let sunriseElement = document.querySelector("#value-sunrise");
    let sunsetElement = document.querySelector("#value-sunset");
    let windElement = document.querySelector("#wind");
    let feelslikeElement = document.querySelector("#value-feeling");
    let countryElement=document.querySelector("#country");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#forecast-icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML= response.data.weather[0].description;
    sunriseElement.innerHTML= formattedDate (response.data.sys.sunrise *1000);
    sunsetElement.innerHTML= formattedDateSunset(response.data.sys.sunset *1000);
    windElement.innerHTML = Math.round(response.data.wind.speed); 
    feelslikeElement.innerHTML= Math.round(response.data.main.feels_like);
    countryElement.innerHTML=response.data.sys.country;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt", response.data.weather[0].description);

}

function formatHours (timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours <10) {hours=`0${hours}`};
    let minutes = date.getMinutes();
    if (minutes <10) {minutes = `0${minutes}`};
    return `${hours}:${minutes}`
}



function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    

    for(let index = 0; index < 6; index ++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
      <div class="col-2">
            <p> ${formatHours(forecast.dt * 1000)} </p>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
            <div class="weather-forecast-temperature">
            ${Math.round(forecast.main.temp)}°  </div>
            </div>
      </div> 
      
    `;
    }

    
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
}

function getCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);





