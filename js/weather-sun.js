const weatherKey = '1f5fe4041a8b86f423b6ef2d17e42825'; //Open Weather Map API Key
const sunKey = '7b6d5c47a46d46e8b32a060dc2d44c7e'; // IPGeolocation API Key
const coordinatesurl = (location) => `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${weatherKey}`; // API URL to fetch coordinates of the searched location
const sunUrl = (location) => `https://api.ipgeolocation.io/astronomy?apiKey=${sunKey}&location=${location}`; // API URL to fetch day length, sunrise time and sunset time of the searched location
const weatherurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'; // API URL to fetch weather details of the searched location

//Fetching data from 'coordinatesurl' and 'sunUrl'
async function getLocationData(location) {
  const coordinatesRes = await fetch(coordinatesurl(location)); // Fetching coordinates data
  const coordinatesResData = await coordinatesRes.json();

  const sunRes = await fetch(sunUrl(location)); // Fetching day length, sunrise time and sunset time data
  const sunResData = await sunRes.json();

  getCoordinates(coordinatesResData);
  getSunData(sunResData);
}

// Getting coordinates
function getCoordinates(data) {
  const lat = data[0].lat;
  const lon = data[0].lon;

  getWeather(lat, lon);
}

// Fetching weather data from 'weatherurl'
async function getWeather(lat, lon) {
  const response = await fetch(weatherurl + `&lat=${lat}&lon=${lon}&appid=${weatherKey}`); // Fetching weather data
  const data = await response.json();

  // Getting required weather data
  const name = data.name;
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const imgCode = data.weather[0].icon;

  showWeatherData(name, temp, humidity, windSpeed, imgCode);
}

// Getting date, day length, sunrise time and sunset time
function getSunData(data) {
  const date = data.date;
  const dayLength = data.day_length;
  const sunrise = data.sunrise;
  const sunset = data.sunset;

  showSunData(date, dayLength, sunrise, sunset);
}

// Displaying weather information
function showWeatherData(name, temp, humidity, windSpeed, imgCode) {
  document.getElementById('weatherDetails').innerHTML = `
    <div id="name"><h1>${name}</h1></div>
    <div id="name-and-temp">
      <div id="name"><img src="https://openweathermap.org/img/wn/${imgCode}.png" alt=""></div>
      <div id="temp">${temp} °C</div>
    </div>

    <div id="humidity">
      <div id="humidityHead"><i class="bi bi-wind"></i> Humdity</div>
      <div id="humidityValue">${humidity} %</div>
    </div>

    <div id="windSpeed">
      <div id="windSpeedHead"><i class="bi bi-speedometer"></i> Wind Speed</div>
      <div id="windSpeed">${windSpeed} Km/h</div>
    </div>
  `;
}

// Displaying day length, sunrise time, sunset time
function showSunData(date, dayLength, sunrise, sunset) {
  document.getElementById('sun').innerHTML = `
    <div id="date">
      <div class="sun-content-head"><i class="bi bi-calendar-fill"></i> <u>${date}</u></div>\
    </div>

    <div id="dayLength">
      <div class="sun-content-head"><i class="bi bi-clock-fill"></i> Day Length</div>
      <div class="sun-content-data">${dayLength} Hours</div>
    </div>

    <div id="sunrise">
      <div class="sun-content-head"><i class="bi bi-sunrise-fill"></i> Sunrise Time</div>
      <div class="sun-content-data">${sunrise} Hours</div>
    </div>

    <div id="sunset">
      <div class="sun-content-head"><i class="bi bi-sunset-fill"></i> Sunset Time</div>
      <div class="sun-content-data">${sunset} Hours</div>
    </div>
  `;
}

// Adding event listener to get information
document.getElementById('form').addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  if (location) {
    getLocationData(location);
  }

  search.value = '';
});