import "./Main.css";

import ItemCard from "../ItemCard/ItemCard";
import "../ItemCard/ItemCard.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext, useMemo } from "react";

function Main({
  weatherTemp,
  onCardClick,
  clothingArr,
  timeOfDay,
  day = true,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const weatherType = useMemo(() => {
    const tempF = weatherTemp?.temperature?.F;
    if (tempF >= 86) {
      return "hot";
    } else if (tempF >= 66 && tempF <= 85) {
      return "warm";
    } else if (tempF <= 65) {
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
      <WeatherCard
        weatherCard={weatherCardImage}
        day={timeOfDay}
        type="cloudy"
        temp={temp}
      />
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
