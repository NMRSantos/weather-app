const form = document.querySelector("form");
const inputField = document.querySelector("input");
const locationField = document.getElementById("location");
const tempField = document.getElementById("current");
const minTempField = document.getElementById("min");
const maxTempField = document.getElementById("max");

form.addEventListener("submit", (event) => {
  const userInput = inputField.value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}/?key=BTQL28EQ6TJJ8CBVW3QNHP987`;
  event.preventDefault();
  weatherApp(url);
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
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function getProperties(parsedJson) {
  const address = parsedJson.address;
  const tempF = parsedJson.days[0].temp;
  const tempMinF = parsedJson.days[0].tempmin;
  const tempMaxF = parsedJson.days[0].tempmax;

  const tempC = convertTemp(tempF);
  const tempMinC = convertTemp(tempMinF);
  const tempMaxC = convertTemp(tempMaxF);
  return {
    address,
    tempF,
    tempMinF,
    tempMaxF,
    tempC,
    tempMinC,
    tempMaxC,
  };
}

function displayWeatherConsoleF(address, tempF, tempMinF, tempMaxF) {
  console.log("Location: ", address);
  console.log("Temperature:", tempF, "f");
  console.log("Min Temperature: ", tempMinF, "f");
  console.log("Max Temperature:", tempMaxF, "f");
}

function displayWeatherConsoleC(address, tempC, tempMinC, tempMaxC) {
  console.log("Location: ", address);
  console.log("Temperature:", tempC, "c");
  console.log("Min Temperature: ", tempMinC, "c");
  console.log("Max Temperature:", tempMaxC, "c");
}

function displayWeatherF(address, tempF, tempMinF, tempMaxF) {
  locationField.textContent = `Location: ${address}`;
  tempField.textContent = `Temperature: ${tempF}F`;
  minTempField.textContent = `Min Temperature: ${tempMinF}F`;
  maxTempField.textContent = `Max Temperature: ${tempMaxF}F`;
}

function displayWeatherC(address, tempC, tempMinC, tempMaxC) {
  locationField.textContent = `Location: ${address}`;
  tempField.textContent = `Temperature: ${tempC}C`;
  minTempField.textContent = `Min Temperature: ${tempMinC}C`;
  maxTempField.textContent = `Max Temperature: ${tempMaxC}C`;
}

async function weatherApp(url) {
  const weatherData = await getWeatherData(url);
  const parsedJson = await parseJson(weatherData);
  const data = getProperties(parsedJson);
  displayWeatherF(data.address, data.tempF, data.tempMinF, data.tempMaxF);
}

const convertTemp = (fahrenheit) => {
  const temp = Math.round((fahrenheit - 32) * (5 / 9)).toFixed(1);
  return temp;
};
