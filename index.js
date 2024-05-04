function getWeather() {
    const locationInput = document.getElementById('locationInput').value;
    const apiKey = "6d179c3e8e62aeadb3e4617215165fd5"; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            changeBackground(data);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = '';

    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description.toLowerCase();

    let weatherClass = '';

    // Determine weather class based on weather description
    if (weatherDescription.includes('sunny')) {
        weatherClass = 'weather-sunny';
    } else if (weatherDescription.includes('rain') || weatherDescription.includes('shower')) {
        weatherClass = 'weather-rainy';
    } else if (weatherDescription.includes('snow') || weatherDescription.includes('winter')) {
        weatherClass = 'weather-winter';
    }

    const weatherInfoHTML = `
        <h2>Today's Weather in ${cityName}</h2>
        <div class="weather-info ${weatherClass}">
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
        </div>
    `;

    weatherInfoDiv.innerHTML = weatherInfoHTML;
}

function changeBackground(data) {
    const body = document.querySelector('body');
    const weatherDescription = data.weather[0].description.toLowerCase();

    // Determine background image URL based on weather description
    if (weatherDescription.includes('sunny')) {
        body.style.backgroundImage = 'url("Images/sunny.jpg")';
    } else if (weatherDescription.includes('rain') || weatherDescription.includes('shower')) {
        body.style.backgroundImage = 'url("Images/rain.jpg")';
    } else if (weatherDescription.includes('snow') || weatherDescription.includes('winter')) {
        body.style.backgroundImage = 'url("Images/winter.jpg")';
    } else {
        // Keep the current background image for other weather conditions
        // No need to update background image
    }

    body.style.backgroundSize = 'cover';
    body.style.transition = 'background-image 0.5s ease-in-out';
}
