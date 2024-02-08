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
// UTILS //
import {
  api,
  addLike,
  removeLike,
  getClothingItems,
  deleteClothingItems,
} from "../../utils/api.js";
import { getForecast } from "../../utils/weatherApi";
/* import { login, signup } from "../../utils/auth.js"; */

// Hooks //
import useAuth from "../../hooks/useAuth.js";
// CONTEXTS //
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext.js";

function App() {
  // Contexts //
  const { setIsLoggedIn } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // General Actions //
  const [buttonDisplay, setButtonDisplay] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Handle Modals //

  const [activeModal, setActiveModal] = useState(null);

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
  });
  function onSubmit(request) {
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
    (modalName, buttonDisplay = null, ...additionalTextOptions) => {
      const additionalText = additionalTextOptions;
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

  const [weatherTemp, setWeatherTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
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
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
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
  const [allClothingArray, setAllClothingArray] = useState([]);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        if (data) {
          setAllClothingArray(data.items);
        }
      })
      .catch(console.error);
  }, []);

  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleCardDelete = (item) => {
    setItemToDelete(item._id);
    // Open the confirmation modal
    toggleModal("confirm", "Are you sure you want to delete this item?", () => {
      // This function will be called when the user clicks "Yes" in the confirmation modal
      setIsDeleteConfirmed(true);
    });
  };

  useEffect(() => {
    // Check if the user has confirmed deletion
    if (isDeleteConfirmed) {
      const deleteItem = async (item) => {
        const token = localStorage.getItem("jwt");
        try {
          setButtonDisplay("Deleting...");
          await api("DELETE", `/items/${item._id}`, token, item);
          const updatedClothesList = await api("GET", "/items", token);
          setAllClothingArray(updatedClothesList);
          handleCloseModal(); // Close the confirmation modal
        } catch (error) {
          setButtonDisplay("Server error, try again");
          console.error("Couldn't delete item:", error);
        }
      };

      // Call the deleteItem function
      deleteItem(itemToDelete);

      // Reset the delete confirmation state
      setIsDeleteConfirmed(false);
    }
  }, [isDeleteConfirmed, itemToDelete, setAllClothingArray, handleCloseModal]);

  const onCardClick = (item) => {
    return () => {
      setActiveModal("preview");
      setSelectedCard(item);
    };
  };
  const onCardLike = async ({ cardId, isLiked }) => {
    const token = localStorage.getItem("jwt");
    let updatedCard;
    if (isLiked) {
      const response = await removeLike({ itemId: cardId }, token);
      if (response.ok) {
        updatedCard = await response.json();
      } else {
        console.error("Error removing like:", response.status);
        return;
      }
    } else {
      const response = await addLike({ itemId: cardId }, token);
      if (response.ok) {
        updatedCard = await response.json();
      } else {
        console.error("Error adding like:", response.status);
        return;
      }
    }
    setAllClothingArray((items) =>
      items.map((item) => (item._id === updatedCard._id ? updatedCard : item))
    ); // changed from cards, card to item ?
  };

  async function handleAddItemSubmit(newItem) {
    const token = localStorage.getItem("jwt");
    setButtonDisplay("Saving...");
    const response = await api("POST", "/items", token, newItem);
    if (response.ok) {
      toggleModal("addItem");
      const updatedClothingArrayResponse = await api("GET", "/items", token);
      if (updatedClothingArrayResponse.ok) {
        const updatedClothingArray = await updatedClothingArrayResponse.json();
        setAllClothingArray(updatedClothingArray);
      } else {
        setButtonDisplay("Server error, try again");
        console.error(
          "Couldn't get updated clothes list:",
          updatedClothingArrayResponse.status
        );
      }
    } else {
      setButtonDisplay("Server error, try again");
      console.error("Couldn't add the item:", response.status);
    }
  }

  // Handle User Actions //

  const fetchUserInfo = useCallback(
    async (authToken) => {
      try {
        const userInfo = await api("GET", "/users/me", authToken);
        console.log("User Info:", userInfo);
        if (userInfo) {
          setCurrentUser(userInfo);
          return userInfo;
        } else {
          console.error("Can't access user");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    },
    [setCurrentUser]
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserInfo(token)
        .then((userInfo) => {
          userInfo.avatar = null ? userInfo.name[0] : userInfo.avatar;
          setCurrentUser(userInfo);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, [fetchUserInfo, setCurrentUser, setIsLoggedIn]);

  const { handleLogIn, handleSignUp, handleLogout, response } = useAuth(
    // Pass the correct fetchUserInfo function
    () => toggleModal(""),
    fetchUserInfo
  );

  useEffect(() => {
    const fetchUserClothes = async () => {
      const token = localStorage.getItem("jwt");
      console.log("JWT Token:", token);
      const response = await api("GET", "/items", token);
      const clothingArray = response.items;
      console.log("Fetched user clothes:", clothingArray);
      setAllClothingArray(clothingArray);
    };
    if (currentUser) {
      fetchUserClothes();
    }
  }, [currentUser]);

  async function handleProfileUpdate({ name, avatar, email }) {
    const token = localStorage.getItem("jwt");
    const data = { name, avatar, email };
    const response = await api("PATCH", "/users/me", token, data);
    if (response.ok) {
      const updatedInfo = await response.json();
      setActiveModal(null);
      setCurrentUser(updatedInfo);
    } else {
      console.error(`Couldn't update profile: ${response.status}`);
    }
  }
  // checks for jwt token and validates with server

  /*   function getInitials(fullName) {
    // Split the full name into an array of words
    const nameParts = fullName.split(" ");
    // Extract the first and last names
    const firstName = nameParts[0] || "";
    const lastName = nameParts[nameParts.length - 1] || "";
    // Get the initials of the first and last names
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    // Return the combined initials
    return firstInitial + lastInitial;
  }
 */
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page_wrapper">
          <Route exact path="/">
            <Header
              fetchUserInfo={fetchUserInfo}
              handleClick={toggleModal}
              weatherLocation={weatherLocation}
              handleAddClick={() => toggleModal("create")}
              /*  getInitials={getInitials} */
            />
          </Route>
          <Route exact path="/">
            <Main
              weatherTemp={weatherTemp}
              timeOfDay={timeOfDay()}
              onCardClick={onCardClick} //handle selected card
              clothingArray={allClothingArray}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile
              onCardClick={onCardClick}
              clothingArray={allClothingArray}
              handleAddClick={() => toggleModal("create")} // changed from "addItem"
              handleLogoutClick={() => toggleModal("logout", "Log Out")}
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
              buttonDisplay={buttonDisplay}
              handleClick={toggleModal}
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
              /* key={item._id} */
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteItem={handleCardDelete}
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
              buttonDisplay={buttonDisplay}
            />
          )}
        </div>
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
