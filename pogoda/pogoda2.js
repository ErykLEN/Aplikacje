const WeatherApp = class {
    constructor(apiKey, resultsBlockSelector) {
        this.apiKey = apiKey;
        this.currentWeatherLink = "https://api.openweathermap.org/data/2.5/weather?q={query}&appid={apiKey}&units=metric&lang=en";
        this.forecastLink = "https://api.openweathermap.org/data/2.5/forecast?q={query}&appid={apiKey}&units=metric&lang=en";
        this.iconLink = "https://openweathermap.org/img/wn/{iconName}@2x.png";

        this.currentWeatherLink = this.currentWeatherLink.replace("{apiKey}", this.apiKey);
        this.forecastLink = this.forecastLink.replace("{apiKey}", this.apiKey);

        this.currentWeather = undefined;
        this.forecast = undefined;

        this.resultsBlock = document.querySelector(resultsBlockSelector);
    }

    getCurrentWeather(query) {
        let url = this.currentWeatherLink.replace("{query}", query);
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", () => {
            this.currentWeather = JSON.parse(req.responseText);
            console.log(this.currentWeather);
            this.drawWeather();
        });
        req.send();
    }

    getForecast(query) {
        let url = this.forecastLink.replace("{query}", query);
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.forecast = data.list;
            this.drawWeather();
        });
    }

    getWeather(query) {
        this.getCurrentWeather(query);
        this.getForecast(query);
    }

    drawWeather() {
        // Wyczyszczenie kontenera wyników
        this.resultsBlock.innerHTML = '';
    
        if (this.currentWeather) {
            const date = new Date(this.currentWeather.dt * 1000);
            const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;
    
            const temperature = this.currentWeather.main.temp;
            const feelsLikeTemperature = this.currentWeather.main.feels_like;
            const iconName = this.currentWeather.weather[0].icon;
            const description = this.currentWeather.weather[0].description;
    
            // Sprawdzenie, czy jest dzień, czy noc
            const now = this.currentWeather.dt;
            const sunrise = this.currentWeather.sys.sunrise;
            const sunset = this.currentWeather.sys.sunset;
            const isDaytime = now >= sunrise && now < sunset;
    
            // Zmiana klasy ciała strony na podstawie pory dnia
            document.body.className = isDaytime ? 'day' : 'night';
    
            // Stwórz i dodaj blok pogody
            const weatherBlock = this.createWeatherBlock(dateTimeString, temperature, feelsLikeTemperature, iconName, description);
            this.resultsBlock.appendChild(weatherBlock);
        }
    
        // Dodanie prognozy (jak poprzednio)
        if (this.forecast && this.forecast.length > 0) {
            this.forecast.forEach((weather) => {
                const date = new Date(weather.dt * 1000);
                const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;
    
                const temperature = weather.main.temp;
                const feelsLikeTemperature = weather.main.feels_like;
                const iconName = weather.weather[0].icon;
                const description = weather.weather[0].description;
    
                const weatherBlock = this.createWeatherBlock(dateTimeString, temperature, feelsLikeTemperature, iconName, description);
                this.resultsBlock.appendChild(weatherBlock);
            });
        }
    }
    

    createWeatherBlock(dateString, temperature, feelsLikeTemperature, iconName, description) {
        let weatherBlock = document.createElement("div");
        weatherBlock.className = "weather-block";

        let dateBlock = document.createElement("div");
        dateBlock.className = "weather-date";
        dateBlock.innerText = dateString;
        weatherBlock.appendChild(dateBlock);

        let temperatureBlock = document.createElement("div");
        temperatureBlock.className = "weather-temperature";
        temperatureBlock.innerHTML = `${temperature} &deg;C`;
        weatherBlock.appendChild(temperatureBlock);

        let feelsLikeBlock = document.createElement("div");
        feelsLikeBlock.className = "weather-temperature-feels-like";
        feelsLikeBlock.innerHTML = `Odczuwalna: ${feelsLikeTemperature} &deg;C`;
        weatherBlock.appendChild(feelsLikeBlock);

        let weatherIcon = document.createElement("img");
        weatherIcon.className = "weather-icon";
        weatherIcon.src = this.iconLink.replace("{iconName}", iconName);
        weatherBlock.appendChild(weatherIcon);

        let weatherDescription = document.createElement("div");
        weatherDescription.className = "weather-description";
        weatherDescription.innerText = description;
        weatherBlock.appendChild(weatherDescription);

        return weatherBlock;
    }
}

document.weatherApp = new WeatherApp("cc3363ad6d96e15426b9ffc586df3ac3", "#weather-results-container");

document.querySelector("#checkButton").addEventListener("click", function() {
    const query = document.querySelector("#locationInput").value;
    document.weatherApp.getWeather(query);
});