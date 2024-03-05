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
  const token = localStorage.getItem("jwt");
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
    // const token = localStorage.getItem("jwt");
    try {
      const response = await getItems(token);
      return response.items;
    } catch (error) {
      console.error("Error fetching clothing information:", error);
      throw error;
    }
  }, [token]);
  useEffect(() => {
    const loadClothingData = async () => {
      try {
        // const token = localStorage.getItem("jwt");
        const clothingData = (await fetchClothingInfo(token)).reverse();
        setClothingArray(clothingData);
      } catch (error) {
        console.error("Error loading clothing data:", error);
      }
    };
    if (currentUser) {
      loadClothingData();
    }
  }, [token, currentUser, fetchClothingInfo]);

  const onCardClick = (item) => {
    return () => {
      handleOpenModal("preview");
      setSelectedCard(item);
    };
  };

  const onCardLike = async ({ itemId, isLiked }) => {
    // const token = localStorage.getItem("jwt");

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

  function handleSubmit(request) {
    // start loading
    setIsLoading(true);

    // Return the promise chain
    return (
      request()
        // we need to close only in `then`
        .then(handleCloseModal)
        // we need to catch possible errors
        // console.error is used to handle errors if you don’t have any other ways for that
        .catch((error) => {
          console.error(error);
        })
        // and in finally we need to stop loading
        .finally(() => setIsLoading(false))
    );
  }
  async function handleAddItemSubmit(newItem) {
    try {
      // Create a function that returns a promise
      const makeRequest = async () => {
        // Return the promise from addItem
        try {
          const res = await addItem(token, newItem);
          // Add the new item to the array
          setClothingArray([res.data, ...clothingArray]);
        } catch (error) {
          // Handle errors
          console.error("Error adding item:", error);
          throw error; // Rethrow the error to be handled in the calling code
        }
      };

      // Call handleSubmit passing the request function
      handleSubmit(makeRequest);
    } catch (error) {
      // Handle other errors
      console.error("Couldn't add the item:", error);
      setErrorResponse(error.message || "Couldn't add the item");
    }
  }

  // async function handleAddItemSubmit(newItem) {
  //   try {
  //     // isLoading true
  //     const res = await addItem(token, newItem);
  //     // Check if there's an error message related to the weather field
  //     // if (res.message && res.message.includes("weather")) {
  //     //   setErrorResponse("Please select a weather type");
  //     // } else {
  //     //   // No weather-related error, clear the error message
  //     //   setErrorResponse("");
  //     // Add the new item to the array
  //     setClothingArray([res.data, ...clothingArray]);
  //     handleCloseModal(); // Close the addItem modal
  //   } catch (error) {
  //     // Handle other errors
  //     console.error("Couldn't add the item:", error);
  //     setErrorResponse(error.message || "Couldn't add the item");
  //   }
  // }
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleCardDelete = (itemId) => {
    setItemToDelete(itemId);
    handleOpenModal("confirm");
  };
  async function handleDeleteConfirmed() {
    try {
      // Create a function that returns a promise
      const makeRequest = () => {
        // Return the promise from deleteItem
        return deleteItem(token, itemToDelete)
          .then(() => {
            // Update the state locally by removing the deleted item
            setClothingArray((prevClothingArray) =>
              prevClothingArray.filter((item) => item._id !== itemToDelete)
            );
            setItemToDelete(null);
          })
          .catch((error) => {
            // Handle errors
            console.error("Couldn't delete item:", error);
            throw error; // Rethrow the error to be handled in the calling code
          });
      };

      // Call handleSubmit passing the request function
      handleSubmit(makeRequest);
    } catch (error) {
      console.error("Couldn't delete item:", error);
    }
  }

  async function handleProfileUpdate({ name, avatar, email }) {
    try {
      // Create a function that returns a promise
      const makeRequest = () => {
        // Return the promise from updateProfile
        return updateProfile(token, { name, avatar, email })
          .then((updatedInfo) => {
            setCurrentUser(updatedInfo.data); // Update the current user with the fetched info
          })
          .catch((error) => {
            // Handle errors
            console.error("Error updating profile:", error);
            throw error; // Rethrow the error to be handled in the calling code
          });
      };

      // Call handleSubmit passing the request function
      await handleSubmit(makeRequest);
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
  } = useAuth(handleOpenModal, handleAddItemSubmit);

  useEffect(() => {
    const checkAuthToken = async () => {
      // const storedToken = localStorage.getItem("jwt");
      try {
        if (token) {
          // Set loading to true while fetching user info
          setIsLoggedInLoading(true);

          // Fetch user info and update current user
          const userInfo = await fetchUserInfo(token);
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
  }, [token, setIsLoggedIn, setIsLoggedInLoading, setCurrentUser]);
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
              isLoading={isLoading}
            />
          )}
          {activeModal === "login" && (
            <LogInModal
              onClose={handleCloseModal}
              isLoading={isLoading}
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
              isLoading={isLoading}
            />
          )}
          {activeModal === "edit profile" && (
            <EditProfileModal
              onClose={handleCloseModal}
              handleProfileUpdate={handleProfileUpdate}
              isLoading={isLoading}
            />
          )}
          {activeModal === "logout" && (
            <ConfirmLogoutModal
              onClose={handleCloseModal}
              handleLogout={handleLogout}
              isLoading={isLoading}
            />
          )}
        </div>
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
