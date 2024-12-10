const apiKey = "d5933a9ff6f6d14006e0817dcd8c6d57";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-img");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error p").style.display = "block";
        documen.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();
        console.log(data)
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherImg.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherImg.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherImg.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherImg.src = "images/drizzle.png";
        }
        else {
            weatherImg.src = "images/rain.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error p").style.display = "none";
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})