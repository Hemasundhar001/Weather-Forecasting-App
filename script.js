const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    displayWeather(data);
  }
}

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherByLocation(lat, lon);
});

async function getWeatherByLocation(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "./img/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "./img/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "./img/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "./img/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "./img/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
