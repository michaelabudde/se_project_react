import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((i) => {
    return i.day === day && i.weatherType === type;
  });
  const weatherOptionUrl = weatherOption?.link || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp} °F</div>
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
