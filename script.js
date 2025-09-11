 const apikey = "3c5184667004e93bf5798355f1704089";
const apiURL ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weathericon");
const card = document.querySelector(".card");


function updateBackground(condition) {
  const body = document.body;

  if (condition === "Clouds") {
    body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
    card.style.background = "rgba(255, 255, 255, 0.15)";
  } else if (condition === "Clear") {
    body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
    card.style.background = "rgba(255, 255, 255, 0.15)";
  } else if (condition === "Rain") {
    body.style.background = "linear-gradient(to right, #667db6, #0082c8, #667db6)";
    card.style.background = "rgba(255, 255, 255, 0.15)";
  } else if (condition === "Drizzle") {
    body.style.background = "linear-gradient(to right, #89f7fe, #66a6ff)";
    card.style.background = "rgba(255, 255, 255, 0.15)";
  } else if (condition === "Mist") {
    body.style.background = "linear-gradient(to right, #606c88, #3f4c6b)";
    card.style.background = "rgba(255, 255, 255, 0.15)";
  } else {
    body.style.background = "linear-gradient(to right, #00feba, #5b548a)";
    card.style.background = "rgba(255, 255, 255, 0.15)";
  }
}

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apikey}`);
  
  if (response.status === 404) {
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "--°C";
    document.querySelector(".humidity").innerHTML = "--%";
    document.querySelector(".wind").innerHTML = "-- km/h";
    weatherIcon.src = "images/error.png";
    updateBackground("Error");
    document.querySelector(".weather").style.display = "block";
    return;
  }

  var data = await response.json();
  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 3.6) + " km/h";

  // dynamic icon + background
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else {
    weatherIcon.src = "images/clouds.png"; // fallback
  }

  updateBackground(data.weather[0].main);
  document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
