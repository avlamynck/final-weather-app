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

function displayTemperature(response) {
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector(".weather-description");
    let sunriseElement = document.querySelector("#value-sunrise");
    let sunsetElement = document.querySelector("#value-sunset");
    let feelslikeElement = document.querySelector("#value-feeling");
    let countryElement=document.querySelector("#country");
    let dateElement = document.querySelector("#date-time");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML= response.data.weather[0].description;
    sunriseElement.innerHTML=response.data.sys.sunrise;
    sunsetElement.innerHTML=response.data.sys.sunset;
    feelslikeElement.innerHTML= Math.round(response.data.main.feels_like);
    countryElement.innerHTML=response.data.sys.country;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);

    console.log(response);


}

let apiKey = "c464dd164b44484161303b9f1d1f0121";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);