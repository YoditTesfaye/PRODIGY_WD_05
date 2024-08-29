const apiKey = "90b6fd0c9d3bb81969658295d11c177d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    if (data.cod === "404") {
        alert("City not found. Please try again.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    switch(data.weather[0].main) {
        case "Clouds":
            WeatherIcon.src = "clouds.png";
            break;
        case "Clear":
            WeatherIcon.src = "clear.png";
            break;
        case "Rain":
            WeatherIcon.src = "rain.png";
            break;
        case "Drizzle":
            WeatherIcon.src = "drizzle.png";
            break;
        case "Mist":
            WeatherIcon.src = "mist.png";
            break;
        default:
            WeatherIcon.src = "default.png"; // Fallback icon
    }
}

searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
});

document.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
    }
});

// Check weather for a default city on page load (if desired)
checkWeather("Ethiopia");
