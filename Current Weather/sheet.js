// API key for OpenWeatherMap
const apiKey = '26c1dc83999e9082458eb683cc21b903';

// DOM elements
const cityElement = document.querySelector('.city');
const timeElement = document.querySelector('.date');
const dateElement = document.querySelector('.time');
const iconElement = document.querySelector('.icon');
const conditionElement = document.querySelector('.condition');
const tempElement = document.querySelector('.temp');
const windspeeedElement = document.querySelector('.windspeed');
const pressureElement = document.querySelector('.pressure');
const humidityElement = document.querySelector('.humidity');
const searchBarElement = document.querySelector('.search-bar');
const searchButtonElement = document.querySelector('button');

// Function to update weather data
function updateWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
 
  // Fetching weather data from OpenWeatherMap API
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to fetch weather data.');
      }
    })
    .then(data => {
      // Updating the DOM with the weather data
      cityElement.textContent = `${data.name}`;
     
      const date = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      dateElement.textContent = date.toLocaleDateString('en-US', options);

      iconElement.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      iconElement.alt = data.weather[0].description;
     
      conditionElement.textContent = data.weather[0].description;
      tempElement.textContent = `${Math.round(data.main.temp)}°C`;
      windspeeedElement.textContent = `Windspeed: ${data.wind.speed} m/s`;
      pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
      humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    })
    .catch(error => {
      console.error(error);
      alert('City not found. Please check the city name and try again.');
    });
}

// Function to handle search button click
function searchButtonClick() {
  const cityName = searchBarElement.value.trim();
 
  if (cityName) {
    updateWeatherData(cityName);
  }
}

// Event listener for search button click
searchButtonElement.addEventListener('click', searchButtonClick);

// Event listener for Enter key press in search bar
searchBarElement.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    searchButtonClick();
  }
});

// Default city
updateWeatherData('Glasgow');
