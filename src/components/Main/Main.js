import "./Main.css";

import ItemCard from "../ItemCard/ItemCard";
import "../ItemCard/ItemCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { weatherOptions, weatherType, day } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext, useMemo } from "react";

function Main({ weatherTemp, onCardClick, clothingArr, timeOfDay }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  // Construct the image path based on weatherType
  const weatherCardImage = weatherOptions.find(
    (option) => option.weatherType === weatherType && option.day === day
  )?.link;

  const filteredCards = clothingArr.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={timeOfDay} type="cloudy" weatherTemp={temp} />
      <section className="main__clothes">
        <div className="main__info">
          <div className="card__section">
            <p className="card__section-title">
              Today is {temp}° {currentTemperatureUnit} and it is {weatherType}
            </p>
            <p className="card__section-title_slash"> / </p>
            <p className="card__section-title">You may want to wear:</p>
          </div>
        </div>
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              item={item}
              key={item._id}
              card={filteredCards}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
