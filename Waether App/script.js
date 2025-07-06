const ApiKey = "HXGEVP8Z273F298QK8WVEHDGV";
const ApiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const searchBox = document.querySelector(".searchbar input");
const searchBtn = document.querySelector(".searchbar button");
const weatherImg = document.querySelector(".weather-img");

async function checkWeather(city) {
    try {
        const response = await fetch(`${ApiUrl}${city}?unitGroup=metric&key=${ApiKey}`);

        // ✅ Check for failed status
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        // ✅ Populate weather data
        document.querySelector(".error").style.display = "none";
        document.querySelector(".city").innerHTML = data.resolvedAddress;
        document.querySelector(".temp").innerHTML = Math.round(data.days[0].temp) + "˚C";
        document.querySelector(".humidity").innerHTML = data.days[0].humidity + "%";
        document.querySelector(".wind").innerHTML = data.days[0].windspeed + " Km/h";

        const Weather = document.querySelector(".weather");
        const details = document.querySelector(".details");

        // ✅ Correct icon values based on Visual Crossing API
        const icon = data.currentConditions.icon;

        if (icon === "partly-cloudy-day") {
            weatherImg.src = "images/clouds.png";
        } else if (icon === "rain") {
            weatherImg.src = "images/rain.png";
        } else if (icon === "clear-day") {
            weatherImg.src = "images/clear.png";
        } else if (icon === "snow") {
            weatherImg.src = "images/snow.png";
        } else if (icon === "fog") {
            weatherImg.src = "images/mist.png";
        } else if (icon === "drizzle") {
            weatherImg.src = "images/drizzle.png";
        }

        Weather.style.display = "block";
        details.style.display = "flex";

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".details").style.display = "none";
        document.querySelector(".weather").style.display = "none";
    }
}

// ✅ Attach listener outside function
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});