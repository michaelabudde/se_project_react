/* eslint-disable react/jsx-no-comment-textnodes */
import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.js";
import "./App.css";

// COMPONENTS //
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

// UTILS //
import { api } from "../../utils/api.js";
import { getForecast } from "../../utils/weatherApi";
import { login, signup } from "../../utils/auth.js";
import {
  getClothingItems,
  deleteClothingItems,
  addClothingItem,
} from "../../utils/api";

// CONTEXTS //
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  CurrentUserContext,
  useCurrentUser,
} from "../../contexts/CurrentUserContext.js";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext.js";

// MODALS //
import AddItemModal from "../AddItemModal/AddItemModal";
import SignUpModal from "../SignUpModal/SignUpModal.js";
import LogInModal from "../LogInModal/LogInModal.js";

function App() {
  const [selectedItem, setSelectedItem] = useState({ src: "", name: "" });
  const [clothesList, setClothesList] = useState([]);

  const { setLoggedIn } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [serverResponse, setServerResponse] = useState("");

  const [buttonDisplay, setButtonDisplay] = useState("");
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingArray, setClothingArray] = useState();
  const [weatherLocation, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSignUpSubmit = () => {
    setActiveModal("signup");
  };
  const handleLogInSubmit = () => {
    setActiveModal("login");
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
  const toggleModal = useCallback(
    (modalName, buttonDisplay = null, ...additionalTextOptions) => {
      const additionalText = [additionalTextOptions];
      if (activeModal === modalName) {
        setActiveModal(null);
      } else {
        setActiveModal(modalName);
        setButtonDisplay(buttonDisplay);
      }
      return additionalText;
    },
    [activeModal]
  );
  const onCardClick = (item) => {
    return () => {
      setActiveModal("preview");
      setSelectedCard(item);
    };
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
      /*   key: values._id, */
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
  async function getUserInfo(authToken) {
    try {
      const userInfo = await api("GET", "user/me", authToken);
      return userInfo;
    } catch (error) {
      console.error("Can't access user", error);
    }
  }

  /* AUTH HOOK */

  async function handleLogIn({ email, password }) {
    console.log("logging you in!");
    try {
      const config = login(email, password);
      const res = await api("AUTH", "signin", "", config);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setActiveModal(null);
        setLoggedIn(true);
        const userInfo = getUserInfo(res.token);
        setCurrentUser(userInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleSignUp({ name, avatar, email, password }) {
    console.log("creating your account!");
    try {
      const config = signup(name, avatar, email, password);
      await api("AUTH", "signup", "", config);
      handleLogIn({ email, password });
      setClothesList();
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    setCurrentUser({ avatar: "P R" });
    toggleModal("logout");
  };

  const fetchUserInfo = useCallback(
    async (token) => {
      try {
        const userInfo = await api("GET", "users/me", token);
        setCurrentUser(userInfo);
      } catch (error) {
        console.error("Can't access user", error);
      }
    },
    [setCurrentUser]
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
      fetchUserInfo(token);
    }
  }, [fetchUserInfo, setLoggedIn]);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        if (data) {
          setClothingArray(data.items);
        }
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
            path="/"
            handleClick={toggleModal}
            ToggleSwitch={<ToggleSwitch />}
            /* weatherData={weatherData} */
            onCreateModal={handleCreateModal}
            signUpModal={handleSignUpSubmit}
            logInModal={handleLogInSubmit}
            weatherTemp={weatherTemp}
            weatherLocation={weatherLocation}
            handleAddClick={() => setActiveModal("create")}
          />
          <Route exact path="/">
            <Main
              weatherTemp={weatherTemp}
              timeOfDay={timeOfDay()}
              onCardClick={onCardClick} //handle selected card
              clothesList={clothesList}
              clothingArr={clothingArray}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              onCardClick={onCardClick}
              clothingArr={clothingArray}
              clothesList={clothesList}
            />
          </ProtectedRoute>
          {/* MODALS */}
          {activeModal === "signup" && (
            <SignUpModal
              onClose={() => toggleModal("signup")}
              isOpen={activeModal === "signup"}
              handleSignUp={handleSignUp}
              buttonDisplay={buttonDisplay}
              handleClick={toggleModal}
            />
          )}
          {activeModal === "login" && (
            <LogInModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              onClose={() => toggleModal("login")}
            />
          )}

          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
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
        </div>
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
