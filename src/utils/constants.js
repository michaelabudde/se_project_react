const location = { latitude: "", longitude: "" };
export { location };
export const weatherOptions = [
  {
    url: require("../images/Day-weather/day-sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../images/Day-weather/day-cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../images/Day-weather/day-fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../images/Day-weather/day-rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../images/Day-weather/day-snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../images/Day-weather/day-storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../images/Night-weather/night-sunny.svg").default,
    day: false,
    type: "clear",
  },
  {
    url: require("../images/Night-weather/night-cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../images/Night-weather/night-fog.svg").default,
    day: false,
    type: "fog",
  },
  {
    url: require("../images/Night-weather/night-rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../images/Night-weather/night-snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../images/Night-weather/night-storm.svg").default,
    day: false,
    type: "storm",
  },
];
