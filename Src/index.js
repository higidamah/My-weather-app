let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDay = document.querySelector("#date");
currentDay.innerHTML = `${day}, ${month} ${date}  ${hours}:${minutes}`;

function searchedCityWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  let weather = response.data.weather[0].main;
  document.querySelector("#weather").innerHTML = `Sky:${weather}`;
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind speed: ${windSpeed} km/h`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = response.data.main.temp;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

function searchCurrentLocation(position) {
  let apiKey = "eaf6651d4bcd92a423378ae8eaa0532b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchedCityWeather);
}
function searchCity(city) {
  let apiKey = "eaf6651d4bcd92a423378ae8eaa0532b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchedCityWeather);
}
function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celciusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelciusTemp(event) {
  event.preventDefault();
  celciusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;
let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", showPosition);

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", showFahrenheitTemp);

let celciusTemp = document.querySelector("#celsius-temp");
celciusTemp.addEventListener("click", showCelciusTemp);

searchCity("Nairobi");
