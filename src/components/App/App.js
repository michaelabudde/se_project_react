import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ItemCard from "./components/ItemCard/ItemCard";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import { location } from "./utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherApi,
} from "./utils/weatherApi";
import { defaultClothingItems } from "./utils/clothingItems";

import secretKey from "../secret";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState({});
  const [activeModal, setActiveModal] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const closeAllModals = () => {
    setActiveModal();
  };

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, secretKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);
};

return (
  <div className="page">
    <div className="page_wrapper">
      <Header
        weatherData={weatherData}
        handleAddClick={() => setActiveModal("create")}
      />
      <Main
        weatherData={weatherData}
        cards={clothingItems}
        onCardClick={handleCardClick}
      />
      <Footer />
    </div>
    {activeModal === "create" && (
      <ModalWithForm
        title="New Garment"
        name="new-card"
        onClose={closeAllModals}
      >
        <label className="modal__label">
          <input
            type="text"
            name="name"
            id="place-name"
            className="modal__input modal__input_type_card-name"
            placeholder="Title"
            required
            minLength="1"
            maxLength="30"
          />
          <span className="modal__error" id="place-name-error"></span>
        </label>
        <label className="modal__label">
          <input
            type="url"
            name="link"
            id="place-link"
            className="modal__input modal__input_type_url"
            placeholder="Image URL"
            required
          />
          <span className="modal__error" id="place-link-error"></span>
        </label>
        <p>Select the Weather Type:</p>
        <div className="modal__input modal__input_type_radio">
          <div>
            <input type="radio" id="choiceHot" name="weatherType" value="hot" />
            <label className="modal__label_radio" htmlFor="choiceHot">
              Hot
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="choiceWarm"
              name="weatherType"
              value="warm"
            />
            <label className="modal__label_radio" htmlFor="choiceWarm">
              Warm
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="choiceCold"
              name="weatherType"
              value="cold"
            />
            <label className="modal__label_radio" htmlFor="choiceCold">
              Cold
            </label>
          </div>
        </div>
      </ModalWithForm>
    )}
    {activeModal === "preview" && (
      <ItemModal card={selectedCard} onClose={closeAllModals} />
    )}
  </div>
);
/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */
