import "./WeatherCard.css";
import "../App/App";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((i) => {
    return i.day === day && i.weatherType === type;
  });
  console.log(weatherOptions);
  const weatherOptionUrl = weatherOption?.link || "";
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}° {currentTemperatureUnit}
      </div>
      <div>
        <img
          src={weatherOptionUrl}
          className="weather__image"
          alt="weather image"
        />
      </div>
    </section>
  );
};
export default WeatherCard;
