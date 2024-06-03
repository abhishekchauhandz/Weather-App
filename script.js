const BASE_URL = new URL("https://api.weatherapi.com/v1");
const html = document.querySelector("html");
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const nameOutput = document.querySelector(".name");
const conditionOutput = document.querySelector(".condition");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const windOutput = document.querySelector(".wind");
const humidityOutput = document.querySelector(".humidity");
const form = document.querySelector("#locationInput");
const searchInput = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = " New Delhi";

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;  //to change the default city to the clicked one

        fetchWeatherData();

        app.style.opacity = "0";
    })
});

form.addEventListener("submit", (e) => {
    if (searchInput.value.length == 0) {
        alert("Please type in a city name");
    } else {
        cityInput = searchInput.value;
        fetchWeatherData();
        searchInput.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

const dayOfTheWeek = (day, month, year) => {
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekDay[new Date(`${day}/${month}/${year}`).getDate()];
};

const apiKey = "01704f37e2f044e7ada204640240206";
const fetchWeatherData = async () => {
    try {
        console.log("Fetching weather data for:", cityInput);
        const response = await fetch(`${BASE_URL}/current.json?key=${apiKey}&q=${cityInput}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Weather data fetched successfully:", data);
        updateweather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch weather data. Please try again later.");
        app.style.opacity = "1"
    }
};

const updateweather = (data) => {
    const weather = data.current;
    const location = data.location;

    // Update DOM elements with weather data

    temp.innerHTML = `${weather.temp_c}&#176`;
    conditionOutput.innerHTML = weather.condition.text;
    const date = location.localtime;
    const y = parseInt(date.substr(0, 4));         //extracting integer number from date for year, month, day and time respectively
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);

    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}${d}/${m}/${y}`;
    timeOutput.innerHTML = time;
    nameOutput.innerHTML = location.name;
    icon.src = `https:${weather.condition.icon}`;

    cloudOutput.innerHTML = weather.cloud + "%";
    humidityOutput.innerHTML = weather.humidity + "%";
    windOutput.innerHTML = weather.wind_kph + "km/h";


    updateBackground(weather);
    app.style.opacity = "1";
};

const updateBackground = (weather) => {

    let timeOfDay = weather.is_day ? "day" : "night";

    const code = weather.condition.code;
    console.log("Weather code:", code, "Time of day:", timeOfDay);

    if (code === 1000) {  // Clear
        app.style.backgroundImage = `url(${timeOfDay}/clear.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#e5ba92" : "#181e27";
    } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {  // Cloudy
        app.style.backgroundImage = `url(${timeOfDay}/cloudy.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#fa6d1b" : "#181e27";
    } else if ([1063, 1069, 1072, 1150, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)) {  // Rainy
        app.style.backgroundImage = `url(${timeOfDay}/rainy.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#647d75" : "#325c80";
    } else {  // Snowy or other weather
        app.style.backgroundImage = `url(${timeOfDay}/snowy.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#4d72aa" : "#1b1b1b";
    }

    app.style.backgroundSize = "cover";
    console.log("Background updated to:", app.style.backgroundImage);
    }


    //    let timeOfDay = "day";
    //    if(!timeOfDay.is_day) {
    //     timeOfDay = "night";
    //    }
    //     const weatherText = weather.condition.text.toLowerCase();

    //     if(weatherText === "partly cloudy" || "cloudy" || "overcast") {
    //         app.style.backgroundImage = `url(${timeOfDay}/cloudy.jpg)`;
    //         app.style.backgroundSize = "cover";
    //         if(timeOfDay === "night") {
    //             app.style.backgroundSize = "cover";
    //             btn.style.background = "#181e27";
    //         }
    //     } else if(weatherText === "clear" || "sunny") {
    //         app.style.backgroundImage = `url(${timeOfDay}/clear.jpg)`;
    //         app.style.backgroundSize= "cover";
    //         btn.style.background = "#e5ba92";
    //         if (timeOfDay == "night") {
    //             app.style.backgroundSize= "cover";
    //             btn.style.background = "#181e27";
    //         }
    //     } else if (weatherText === "rain" || "drizzle" || "showers") {
    //         app.style.backgroundImage = `url(${timeOfDay}/rainy.jpg)`;
    //         app.style.backgroundSize= "cover";
    //         btn.style.background = "#647d75";
    //         if (timeOfDay == "night") {
    //             app.style.backgroundSize= "cover";
    //             btn.style.background = "#325c80";
    //         }
    //     } else {
    //         app.style.backgroundImage = `url(${timeOfDay}/snowy.jpg)`;
    //         app.style.backgroundSize= "cover";
    //         btn.style.background = "#4d72aa";
    //         if (timeOfDay == "night") {
    //             app.style.backgroundSize= "cover";
    //             btn.style.background = "#1b1b1b";
    //         }
    //     }

window.addEventListener("load", () => {
    fetchWeatherData();
    app.style.opacity = "1";
})