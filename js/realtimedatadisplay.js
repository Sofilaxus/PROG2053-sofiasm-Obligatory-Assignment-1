const weatherContainer = document.getElementById('weatherContainer');
const locations = [
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 }
];

const weatherData = {};

function displayWeather(location, data) {
    if (weatherData[location.name]) {
        const existingElement = weatherData[location.name];
        existingElement.querySelector('.temperature').textContent = `Temperature: ${data.current_weather.temperature}°C`;
        existingElement.querySelector('.windspeed').textContent = `Wind Speed: ${data.current_weather.windspeed} km/h`;
    } else {
        const weatherElement = document.createElement('div');
        weatherElement.classList.add('weather-info');
        weatherElement.innerHTML = `
            <h3>${location.name}</h3>
            <p class="temperature">Temperature: ${data.current_weather.temperature}°C</p>
            <p class="windspeed">Wind Speed: ${data.current_weather.windspeed} km/h</p>
        `;
        weatherContainer.appendChild(weatherElement);

        weatherData[location.name] = weatherElement;
    }
}

function loadWeather() {
    locations.forEach(location => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                displayWeather(location, data);
            })
            .catch(error => {
                console.error(`Error fetching weather for ${location.name}: ${error.message}`);
            });
    });
}

loadWeather();
setInterval(loadWeather, 3000);
