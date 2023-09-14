import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";
/* import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
 */
const WeatherCard = (day, type, weatherTemp = "") => {
  const weatherOption = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });
  const weatherOptionUrl = weatherOption.url || "";
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
