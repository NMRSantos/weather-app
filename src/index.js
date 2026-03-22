const form = document.querySelector("form");
const inputField = document.querySelector("input");

form.addEventListener("submit", (event) => {
  const userInput = inputField.value;
  event.preventDefault();
  weatherApp(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}/?key=BTQL28EQ6TJJ8CBVW3QNHP987`,
  );
  inputField.value = "";
});

async function getWeatherData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function parseJson(weatherData) {
  try {
    const response = await weatherData.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(parsedJson) {
  console.log("Location: ", parsedJson.address);
  console.log("Temperature:", parsedJson.days[0].temp);
  console.log("Min Temperature: ", parsedJson.days[0].tempmin);
  console.log("Max Temperature:", parsedJson.days[0].tempmax);
}

async function weatherApp(url) {
  const weatherData = await getWeatherData(url);
  const parsedJson = await parseJson(weatherData);
  displayWeather(parsedJson);
}
