import { processServerResponse } from "../utils/api";
const latitude = 19.432;
const longitude = -99.133;
const APIkey = `9ce8b49fe15f8d325d97fd1f76150e35`;
export const getForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);

  return weatherApi;
};
export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};
export const parseLocationData = (data) => {
  const weatherLocation = data.name;
  return weatherLocation;
};
