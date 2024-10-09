document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = 'c1a567c01aaaf235fb39f29c774da9cc';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(`Searching for city: ${city}`);
    console.log(`API URL: ${apiUrl}`);

    if (city) {
        fetch(apiUrl)
            .then(response => {
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`City not found: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);
                displayWeatherInfo(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-info').innerHTML = `<p class="error">${error.message}</p>`;
            });
    } else {
        document.getElementById('weather-info').innerHTML = '<p class="error">Please enter a city name.</p>';
    }
});

function displayWeatherInfo(data) {
    const weatherInfo = `
        <div class="weather-card">
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}
