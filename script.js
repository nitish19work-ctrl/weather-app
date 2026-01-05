const apiKey = "9dc2f8440aac8a762d9b334abe3352e5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loading = document.querySelector(".loading");

async function checkWeather(city){
    if(city === "") return;

    loading.style.display = "block";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    loading.style.display = "none";

    if(response.status === 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const condition = data.weather[0].main;

    if(condition === "Clouds") weatherIcon.src = "images/clouds.png";
    else if(condition === "Clear") weatherIcon.src = "images/clear.png";
    else if(condition === "Rain") weatherIcon.src = "images/rain.png";
    else if(condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if(condition === "Mist") weatherIcon.src = "images/mist.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        checkWeather(searchBox.value.trim());
    }
});
const root = document.documentElement;

function setTheme(condition){
    if(condition === "Clear"){
        root.style.setProperty("--accent","#facc15");
    }
    else if(condition === "Rain"){
        root.style.setProperty("--accent","#38bdf8");
    }
    else{
        root.style.setProperty("--accent","#a78bfa");
    }
}
