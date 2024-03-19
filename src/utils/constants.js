const location = { latitude: "", longitude: "" };
export { location };
export const link = URL;
export const day = true;
export const headers = {
  authorization: "",
  "Content-Type": "application/json",
};
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrapp.ignorelist.com"
    : "http://localhost:3001";
export const weatherOptions = [
  {
    link: require("../images/day/day-sunny.svg").default,
    day: true,
    weatherType: "hot",
  },
  {
    link: require("../images/day/day-cloudy.svg").default,
    day: true,
    weatherType: "cold",
  },

  {
    link: require("../images/night/night-clear.svg").default,
    day: false,
    weatherType: "warm",
  },

  {
    link: require("../images/night/night-cloudy.svg").default,
    day: false,
    weatherType: "warm",
  },
  {
    link: require("../images/night/night-fog.svg").default,
    day: false,
    weatherType: "hot",
  },

  {
    link: require("../images/night/night-snow.svg").default,
    day: false,
    weatherType: "cold",
  },
];
