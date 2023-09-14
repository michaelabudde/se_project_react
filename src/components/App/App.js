import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { location } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherApi,
  parseWeatherData,
} from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";

import secretKey from "../../secret";

const App = () => {
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [clothingItems, setClothingItems] = useState({});
  const [activeModal, setActiveModal] = useState({});
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  /*   const handleSelectedCard = (card) => {
    setSelectedCard(card);
  }; */

  useEffect(() => {
    getForecastWeather().then((data) => {
      const weatherTemp = parseWeatherData(data);
      setWeatherTemp(weatherTemp);
    });
  }, []);

  return (
    <div className="page">
      <div className="page_wrapper">
        <Header
          onCreateModal={handleCreateModal}
          weatherTemp={weatherTemp}
          handleAddClick={() => setActiveModal("create")}
        />
        <Main
          weatherTemp={weatherTemp}
          cards={clothingItems}
          onCardClick={handleCardClick} //handle selected card
        />
        <Footer />
      </div>
      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          name="new-card"
          onClose={handleCloseModal}
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
              <input
                type="radio"
                id="choiceHot"
                name="weatherType"
                value="hot"
              />
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
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
};
export default App;

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
