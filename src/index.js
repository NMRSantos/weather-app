async function getWeatherData(url) {
  try {
    const weatherData = await fetch(url);
    if (!weatherData.ok) {
      throw new Error(`Status: ${weatherData.status}`);
    }
    const weatherJson = await weatherData.json();
    console.log("Location: ", weatherJson.address);
    console.log("Temperature:", weatherJson.days[0].temp);
    console.log("Min Temperature: ", weatherJson.days[0].tempmin);
    console.log("Max Temperature:", weatherJson.days[0].tempmax);
  } catch (error) {
    console.log(error);
  }
}
getWeatherData(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Lisbon/?key=BTQL28EQ6TJJ8CBVW3QNHP987",
);
