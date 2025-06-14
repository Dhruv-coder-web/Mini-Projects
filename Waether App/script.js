const ApiKey = "982c21ae44ce7714d1b16565961b759";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 
const searchBox = document.querySelector(".searchbar input");
const searchBtn = document.querySelector(".searchbar button");

async function checkWeather(city) {
    const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "˚c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    searchBtn.addEventListener("click", () =>{
        checkWeather(searchBox.value);
    });
}

