import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, weatherType, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((i) => {
    return i.day === day && i.weatherType === weatherType;
  });
  const weatherOptionUrl = weatherOption?.url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}</div>
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
