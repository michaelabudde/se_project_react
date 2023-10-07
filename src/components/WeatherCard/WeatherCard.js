import "./WeatherCard.css";
import "../App/App";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";

const WeatherCard = ({ day, weatherType, temp = "" }) => {
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.weather === weatherType;
  });

  const weatherOptionUrl = weatherOption?.link || "";
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {temp}° {currentTemperatureUnit}
      </div>
      <div>
        <img
          src={weatherOptionUrl}
          className="weather__image"
          alt="weather type"
        />
      </div>
    </section>
  );
};
export default WeatherCard;
