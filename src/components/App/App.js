import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  getForecastWeather,
  parseWeatherData,
  parseLocationData,
} from "../../utils/weatherApi";

const App = () => {
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherLocation, setWeatherLocation] = useState("");
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

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const weatherTemp = parseWeatherData(data);
        const weatherNumber = parseInt(weatherTemp.temperature.F, 10);
        setWeatherTemp(weatherNumber);
        const location = parseLocationData(data);
        setWeatherLocation(location);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  return (
    <div className="page">
      <div className="page_wrapper">
        <Header
          onCreateModal={handleCreateModal}
          weatherTemp={weatherTemp}
          weatherLocation={weatherLocation}
          handleAddClick={() => setActiveModal("create")}
        />
        <Main
          weatherTemp={weatherTemp}
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
          <div>
            <label className="modal__label">
              Name
              <input
                type="text"
                name="name"
                className="modal__input modal__input_type_card-name"
                placeholder="Name"
                required
                minLength="1"
                maxLength="30"
              />
            </label>
            <label className="modal__label">
              Image
              <input
                type="url"
                name="link"
                className="modal__input modal__input_type_url"
                placeholder="Image URL"
                required
              />
            </label>

            <label className="modal__label">Select the Weather Type:</label>
            <div className="modal__radio-inputs">
              <div>
                <input
                  className="modal__input_type_radio"
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
                  className="modal__input_type_radio"
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
                  className="modal__input_type_radio"
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
