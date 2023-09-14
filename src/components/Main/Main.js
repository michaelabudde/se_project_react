import React from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import "../ItemCard/ItemCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/clothingItems";

function Main({ weatherTemp, clothingItems, onCardClick }) {
  /*   const weatherTemp = "75°F"; */
  const actualWeather = weatherTemp.temperature;

  const weatherType = () => {
    if (actualWeather >= 86) {
      return "hot";
    } else if (actualWeather >= 66 && actualWeather <= 85) {
      return "warm";
    } else if (actualWeather <= 65) {
      return "cold";
    }
  };
  return (
    <main className="main">
      <WeatherCard day={false} type="sunny" weatherTemp={weatherTemp} />
      <section className="main__clothes">
        <div className="main__info">
          <div className="card__section">
            <p className="card__section-title">
              Today is {actualWeather}°F and it is {weatherType()}
            </p>
            <p className="card__section-title_slash"> / </p>
            <p className="card__section-title">You may want to wear:</p>
          </div>
        </div>
        <ul className="card__items">
          {defaultClothingItems
            .filter((card) => card.weather === weatherType())
            .map((filteredCard) => (
              <ItemCard
                key={filteredCard._id}
                card={filteredCard}
                onCardClick={onCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
