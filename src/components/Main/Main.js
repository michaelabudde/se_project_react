import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import "../ItemCard/ItemCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/clothingItems";
import { useMemo } from "react";
function Main({ weatherTemp, onCardClick }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);
  console.log(weatherType);
  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  return (
    <main className="main">
      <WeatherCard day={false} type="sunny" weatherTemp={weatherTemp} />
      <section className="main__clothes">
        <div className="main__info">
          <div className="card__section">
            <p className="card__section-title">
              Today is {weatherTemp}°F and it is {weatherType()}
            </p>
            <p className="card__section-title_slash"> / </p>
            <p className="card__section-title">You may want to wear:</p>
          </div>
        </div>
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              item={item}
              /*               key={filteredCard._id}
              card={filteredCard} */
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
