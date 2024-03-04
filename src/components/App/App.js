/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState, useCallback, useContext } from "react";

// Routes //
import { Route } from "react-router-dom";
import ProtectedRoute from "../../contexts/ProtectedRoute.js";

// STYLES //
import "./App.css";

// COMPONENTS //
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

// MODALS //
import AddItemModal from "../AddItemModal/AddItemModal";
import SignUpModal from "../SignUpModal/SignUpModal.js";
import LogInModal from "../LogInModal/LogInModal.js";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfile/EditProfileModal.js";
import ConfirmLogoutModal from "../ConfirmationModals/ConfirmLogoutModal.js";
import ConfirmDeleteModal from "../ConfirmationModals/ConfirmDeleteModal.js";

// UTILS //
import {
  getItems,
  addItem,
  deleteItem,
  likeCard,
  fetchUserInfo,
  updateProfile,
} from "../../utils/api.js";
import { getForecast } from "../../utils/weatherApi";

// Hooks //
import useAuth from "../../hooks/useAuth.js";

// CONTEXTS //
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";

function App() {
  // Contexts //
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // General Actions //
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  // Handle Modals //
  const [activeModal, setActiveModal] = useState(null);
  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);
  const handleOpenModal = useCallback((modalName) => {
    setActiveModal(modalName);
  }, []);

  function onSubmit(e, request) {
    e.preventDefault();
    setIsLoading(true);
    console.log(request);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  // debugger;
  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal(null);
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, handleCloseModal]); // watch activeModal here

  const [weatherTemp, setWeatherTemp] = useState(0);
  // const { currentTemperatureUnit, } = useContext(
  //   CurrentTemperatureUnitContext
  // );
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };
  const [weatherLocation, setLocation] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };
  const dateNow = Date.now() * 0.001;
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
  // Handle Card Actions //
  const [selectedCard, setSelectedCard] = useState({ src: "", name: "" });
  const [clothingArray, setClothingArray] = useState([]);
  const fetchClothingInfo = useCallback(async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await getItems(token);
      return response.items;
    } catch (error) {
      console.error("Error fetching clothing information:", error);
      throw error;
    }
  }, []);
  useEffect(() => {
    const loadClothingData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const clothingData = await fetchClothingInfo(token);
        setClothingArray(clothingData);
      } catch (error) {
        console.error("Error loading clothing data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser) {
      loadClothingData();
    }
  }, [currentUser, fetchClothingInfo]);

  const onCardClick = (item) => {
    return () => {
      setActiveModal("preview");
      setSelectedCard(item);
    };
  };

  const onCardLike = async ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await likeCard(token, itemId, isLiked);

      const updatedCard = await response;

      setClothingArray((prevClothingArray) =>
        prevClothingArray.map((item) =>
          item._id === updatedCard.data._id ? updatedCard.data : item
        )
      );
    } catch (error) {
      console.error("Error updating clothing array:", error);
    }
  };
  async function handleAddItemSubmit(newItem) {
    const token = localStorage.getItem("jwt");
    try {
      // const res = await api("POST", "/items", token, newItem);
      const res = await addItem(token, newItem);
      // Check if there's an error message related to the weather field
      // if (res.message && res.message.includes("weather")) {
      //   setErrorResponse("Please select a weather type");
      // } else {
      //   // No weather-related error, clear the error message
      //   setErrorResponse("");
      // Add the new item to the array
      setClothingArray([res.data, ...clothingArray]);
      handleCloseModal(); // Close the addItem modal
    } catch (error) {
      // Handle other errors
      console.error("Couldn't add the item:", error);
      setErrorResponse(error.message || "Couldn't add the item");
    }
  }

  const [itemToDelete, setItemToDelete] = useState(null);
  const handleCardDelete = (itemId) => {
    setItemToDelete(itemId);
    handleOpenModal("confirm");
  };
  async function handleDeleteConfirmed() {
    const token = localStorage.getItem("jwt");
    try {
      await deleteItem(token, itemToDelete);
      setClothingArray((prevClothingArray) =>
        prevClothingArray.filter((item) => item._id !== itemToDelete)
      );
      setItemToDelete(null);
      handleCloseModal(null);
    } catch (error) {
      console.error("Couldn't delete item:", error);
    }
  }

  async function handleProfileUpdate({ name, avatar, email }) {
    try {
      const token = localStorage.getItem("jwt");
      const data = { name, avatar, email };

      // Use the new updateProfile function
      const updatedInfo = await updateProfile(token, data);

      if (updatedInfo) {
        // Fetch the updated user information
        const userInfo = await fetchUserInfo(token);
        setCurrentUser(userInfo); // Update the current user with the fetched info
        handleCloseModal(null);
      } else {
        console.error("Couldn't update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
  const {
    handleLogIn,
    handleSignUp,
    handleLogout,
    errorResponse,
    setErrorResponse,
    signupError,
    loginError,
    // fetchUserInfo,
  } = useAuth(handleOpenModal, handleAddItemSubmit);

  useEffect(() => {
    const checkAuthToken = async () => {
      const storedToken = localStorage.getItem("jwt");
      try {
        if (storedToken) {
          // Set loading to true while fetching user info
          setIsLoggedInLoading(true);

          // Fetch user info and update current user
          const userInfo = await fetchUserInfo(storedToken);
          setCurrentUser(userInfo);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        // Whether successful or not, set loading to false
        setIsLoggedInLoading(false);
      }
    };

    checkAuthToken();
  }, [setIsLoggedIn, setIsLoggedInLoading, setCurrentUser]);
  // removed fetchUserInfo from being a dependency which fixed infinite loop

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
        <div className="page_wrapper">
          <Header
            handleClick={handleOpenModal}
            weatherLocation={weatherLocation}
            weatherTemp={weatherTemp}
            handleToggleSwitchChange={handleToggleSwitchChange}
            handleAddClick={() => handleOpenModal("create")}
          />

          <Route exact path="/">
            <Main
              weatherTemp={weatherTemp}
              timeOfDay={timeOfDay()}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              clothingArray={clothingArray}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            isLoggedInLoading={isLoggedInLoading}
            path="/profile"
          >
            <Profile
              onCardClick={onCardClick}
              clothingArray={clothingArray}
              handleAddClick={() => handleOpenModal("create")}
              handleLogoutClick={() => handleOpenModal("logout")}
              handleEditProfileClick={() => handleOpenModal("edit profile")}
              onCardLike={onCardLike}
            />
          </ProtectedRoute>
          {activeModal === "signup" && (
            <SignUpModal
              onClose={handleCloseModal}
              handleSignUp={handleSignUp}
              handleClick={handleOpenModal}
              signupError={signupError}
            />
          )}
          {activeModal === "login" && (
            <LogInModal
              onClose={handleCloseModal}
              isLoading={isLoading}
              onSubmit={onSubmit}
              handleLogIn={handleLogIn}
              handleClick={handleOpenModal}
              loginError={loginError}
            />
          )}
          {activeModal === "create" && (
            <AddItemModal
              onClose={handleCloseModal}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
              errorResponse={errorResponse}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteItem={handleCardDelete}
            />
          )}
          {activeModal === "confirm" && (
            <ConfirmDeleteModal
              onClose={handleCloseModal}
              handleDelete={handleDeleteConfirmed}
              selectedCard={selectedCard}
            />
          )}
          {activeModal === "edit profile" && (
            <EditProfileModal
              onClose={handleCloseModal}
              handleProfileUpdate={handleProfileUpdate}
            />
          )}
          {activeModal === "logout" && (
            <ConfirmLogoutModal
              onClose={handleCloseModal}
              handleLogout={handleLogout}
            />
          )}
        </div>
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
