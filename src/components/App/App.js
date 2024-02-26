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
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

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
  api,
  fetchUserInfo,
  addLike,
  removeLike /* getClothingItems */,
} from "../../utils/api.js";
import { getForecast } from "../../utils/weatherApi";

// Hooks //
import useAuth from "../../hooks/useAuth.js";
// CONTEXTS //
import {
  CurrentTemperatureUnitContext,
  CurrentTemperatureUnitProvider,
} from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext.js";

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
    setActiveModal("");
  });
  function onSubmit(e, request) {
    e.preventDefault();
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
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
  }, [activeModal, handleCloseModal]); // watch activeModal here

  const toggleModal = useCallback(
    (modalName) => {
      if (activeModal === modalName) {
        setActiveModal(null);
      } else {
        setActiveModal(modalName);
      }
    },
    [activeModal]
  );
  const [weatherTemp, setWeatherTemp] = useState(0);
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

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
    // removed Auth Token, added token const ?
    const token = localStorage.getItem("jwt");
    try {
      const response = await api("GET", "/items", token);
      return response.items;
    } catch (error) {
      console.error("Error fetching clothing information:", error);
      throw error; // You may choose to handle the error differently based on your requirements
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
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleCardDelete = (itemId) => {
    setItemToDelete(itemId);
    // Open the confirmation modal
    toggleModal("confirm");
  };

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem("jwt");
    try {
      await api("DELETE", `/items/${itemToDelete}`, token);

      // Update the state locally by removing the deleted item
      setClothingArray((prevClothingArray) =>
        prevClothingArray.filter((item) => item._id !== itemToDelete)
      );

      handleCloseModal(); // Close the confirmation modal
    } catch (error) {
      console.error("Couldn't delete item:", error);
    } finally {
      // Reset the delete confirmation state
      setItemToDelete(null);
    }
  };

  const onCardClick = (item) => {
    return () => {
      setActiveModal("preview");
      setSelectedCard(item);
    };
  };

  const onCardLike = async ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");
    try {
      // Call the API directly based on the like or dislike action
      const response = await api(
        isLiked ? "DELETE" : "PUT",
        `/items/${itemId}/likes`,
        token
      );
      const updatedCard = await response;
      setClothingArray((prevClothingArray) =>
        prevClothingArray.map((item) =>
          item._id === updatedCard.data._id ? updatedCard.data : item
        )
      );
    } catch (error) {
      console.error(`Error ${isLiked ? "removing" : "adding"} like:`);
      console.error("Error updating clothing array:", error);
    }
  };

  async function handleAddItemSubmit(newItem) {
    const token = localStorage.getItem("jwt");
    try {
      toggleModal("addItem");
      const response = await api("POST", "/items", token, newItem);
      // add new item to array
      setClothingArray([...clothingArray, response.data]);
      handleCloseModal(); // Close the addItem modal
    } catch (err) {
      // log error to console
      console.error("Couldn't add the item:", response.status);
    }
  }

  // Handle User Actions //
  const fetchUserInfo = useCallback(async (authToken) => {
    const currentUser = await api("GET", "/users/me", authToken);
    if (currentUser) {
      return currentUser.data;
    } else {
      console.error("Can't access user");
      throw Error("Error");
    }
  }, []);

  async function handleProfileUpdate({ name, avatar, email }) {
    try {
      const token = localStorage.getItem("jwt");
      const data = { name, avatar, email };
      const updatedInfo = await api("PATCH", "/users/me", token, data);

      // processServerResponse already handles the ok check
      if (updatedInfo) {
        // Fetch the updated user information
        const userInfo = await fetchUserInfo(token);

        setActiveModal(null);
        setCurrentUser(userInfo); // Update the current user with the fetched info
      } else {
        console.error("Couldn't update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const { handleLogIn, handleSignUp, handleLogout, response, signupError } =
    useAuth(
      // Pass the correct fetchUserInfo function
      () => toggleModal(""),

      fetchUserInfo
    );

  // useEffect(() => {
  //   const checkAuthToken = async () => {
  //     const storedToken = localStorage.getItem("jwt");
  //     if (storedToken) {
  //       setIsLoggedIn(true);
  //       // Fetch user info and update current user
  //       const userInfo = await fetchUserInfo(storedToken);
  //       setCurrentUser(userInfo);
  //     }
  //   };
  //   checkAuthToken();
  // }, [setIsLoggedIn, setCurrentUser, fetchUserInfo]);

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
  }, [setIsLoggedIn, setIsLoggedInLoading, fetchUserInfo, setCurrentUser]);

  return (
    <div className="page">
      <CurrentTemperatureUnitProvider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page_wrapper">
          <Header
            fetchUserInfo={fetchUserInfo}
            handleClick={toggleModal}
            weatherLocation={weatherLocation}
            handleAddClick={() => toggleModal("create")}
            /*  getInitials={getInitials} */
          />

          <Route exact path="/">
            <Main
              weatherTemp={weatherTemp}
              timeOfDay={timeOfDay()}
              onCardClick={onCardClick} //handle selected card
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
              handleAddClick={() => toggleModal("create")} // changed from "addItem"
              handleLogoutClick={() => toggleModal("logout")}
              handleEditProfileClick={() => toggleModal("edit profile")}
              onCardLike={onCardLike}
              /* getInitials={getInitials} */
            />
          </ProtectedRoute>
          {activeModal === "signup" && (
            <SignUpModal
              onClose={handleCloseModal}
              isOpen={activeModal === "signup"}
              handleSignUp={handleSignUp}
              handleClick={toggleModal}
              signupError={signupError}
            />
          )}
          {activeModal === "login" && (
            <LogInModal
              onClose={handleCloseModal}
              isOpen={activeModal === "login"}
              isLoading={isLoading}
              onSubmit={onSubmit}
              handleLogIn={handleLogIn}
              handleClick={toggleModal}
            />
          )}
          {activeModal === "create" && (
            <AddItemModal
              onClose={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
              onSubmit={onSubmit}
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
              onClose={toggleModal}
              handleDelete={handleDeleteConfirmed}
              selectedCard={selectedCard}
            />
          )}
          {activeModal === "edit profile" && (
            <EditProfileModal
              onClose={handleCloseModal}
              isOpen={activeModal === "edit profile"}
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
      </CurrentTemperatureUnitProvider>
    </div>
  );
}
export default App;
