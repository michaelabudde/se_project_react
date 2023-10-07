import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getForecast } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getClothingItems,
  deleteClothingItems,
  addClothingItem,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";

const App = () => {
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingArray, setClothingArray] = useState([]);
  const [weatherLocation, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
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
  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };
  const [isLoading, setIsLoading] = React.useState(false);

  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const dateNow = Date.now() * 0.001;
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleCardDelete = (_id) => {
    deleteClothingItems(_id)
      .then((res) => {
        const updatedArray = clothingArray.filter((item) => {
          return item._id !== _id;
        });
        setClothingArray(updatedArray);
        handleCloseModal();
      })

      .catch(console.error);
  };
  function handleSubmit(request) {
    // start loading
    setIsLoading(true);
    request()
      // we need to close only in `then`
      .then(handleCloseModal)
      // we need to catch possible errors
      // console.error is used to handle errors if you don’t have any other ways for that
      .catch(console.error)
      // and in finally we need to stop loading
      .finally(() => setIsLoading(false));
  }

  const handleAddItemSubmit = (values) => {
    const newItem = {
      name: values.name,
      weather: values.weatherType,
      imageUrl: values.link,
    };

    function makeRequest() {
      return addClothingItem(newItem).then((res) => {
        setClothingArray([res, ...clothingArray]);
      });
    }

    handleSubmit(makeRequest);
  };

  function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }
  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingArray(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getForecast()
      .then((data) => {
        const weather = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
        };
        const locationName = data.name;
        setLocation(locationName);
        setWeatherTemp(weather);
        const sunriseData = data.sys.sunrise;
        setSunrise(sunriseData);
        const sunsetData = data.sys.sunset;
        setSunset(sunsetData);
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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page_wrapper">
          <Header
            onCreateModal={handleCreateModal}
            weatherTemp={weatherTemp}
            weatherLocation={weatherLocation}
            handleAddClick={() => setActiveModal("create")}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={weatherTemp}
                timeOfDay={timeOfDay()}
                onCardClick={handleCardClick} //handle selected card
                clothingArr={clothingArray}
                isLoading={isLoading}
              />
            </Route>
            <Route path="/profile">
              <Profile
                onCreateModal={handleCreateModal}
                onCardClick={handleCardClick}
                clothingArr={clothingArray}
              />
            </Route>
          </Switch>
          <Footer />
        </div>
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
            isLoading={isLoading}
            useForm={useForm}
            handleSubmit={handleSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDeleteItem={handleCardDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};
export default App;
