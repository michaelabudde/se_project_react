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
  addClothingItem,
  deleteClothingItems,
} from "../../utils/api.js";
import { getForecast } from "../../utils/weatherApi";
import { login, signup } from "../../utils/auth.js";

// CONTEXTS //
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  CurrentUserContext,
  useCurrentUser,
  CurrentUserProvider,
} from "../../contexts/CurrentUserContext.js";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext.js";

function App() {
  // Contexts //
  const { setLoggedIn } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useCurrentUser();

  // General Actions //
  const [buttonDisplay, setButtonDisplay] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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

  // Handle Modals //
  const [activeModal, setActiveModal] = useState(null);

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

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

  // Handle Weather & Time //
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
  const [clothingArray, setClothingArray] = useState([]);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        if (data) {
          setClothingArray(data.items);
        }
      })
      .catch(console.error);
  }, []);

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

  const onCardClick = (item) => {
    return () => {
      setActiveModal("preview");
      setSelectedCard(item);
    };
  };
  const handleLikeClick = async ({ cardId, isLiked }) => {
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
    setClothingArray((cards) =>
      cards.map((card) => (card._id === updatedCard._id ? updatedCard : card))
    );
  };

  async function handleAddItemSubmit(newItem) {
    const token = localStorage.getItem("jwt");
    setButtonDisplay("Saving...");
    const response = await api("POST", "items", token, newItem);
    if (response.ok) {
      toggleModal("addItem");
      const updatedClothingArrayResponse = await api("GET", "items", token);
      if (updatedClothingArrayResponse.ok) {
        const updatedClothingArray = await updatedClothingArrayResponse.json();
        setClothingArray(updatedClothingArray);
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
  const handleSignUpSubmit = () => {
    setActiveModal("signup");
  };
  const handleLogInSubmit = () => {
    setActiveModal("login");
  };

  async function getUserInfo(authToken) {
    const response = await api("GET", "/musere", authToken);
    if (response.ok) {
      const userInfo = await response.json();
      return userInfo;
    } else {
      console.error("Can't access user:", response.status);
      // Handle error cases if needed
      return null; // You might want to return some default value or handle the error differently
    }
  }

  async function handleLogIn({ email, password }) {
    console.log("logging you in!");
    const config = login(email, password);
    api("AUTH", "signin", "", config)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setActiveModal(null);
          setLoggedIn(true);
          return getUserInfo(res.token);
        } else {
          return Promise.reject("Invalid response from server");
        }
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleSignUp({ name, avatar, email, password }) {
    console.log("creating your account!");
    const config = signup(name, avatar, email, password);
    api("AUTH", "signup", "", config)
      .then(() => handleLogIn({ email, password })) // Log in after signing up
      .then(() => setClothingArray()) // Set clothing array after logging in
      .catch((error) => {
        console.error(error);
      });
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
      const response = await api("GET", "users/me", token);
      if (response.ok) {
        const userInfo = await response.json();
        setCurrentUser(userInfo);
      } else {
        console.error(`Can't access user. Error: ${response.status}`);
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
    const fetchUserClothes = async () => {
      const token = localStorage.getItem("jwt");
      const response = await api("GET", "items", token);
      if (response.ok) {
        const ClothingArray = await response.json();
        setClothingArray(ClothingArray);
      } else {
        console.error(`Error fetching user clothes: ${response.status}`);
      }
    };
    if (currentUser) {
      fetchUserClothes();
    }
  }, [currentUser]);

  async function handleProfileUpdate({ name, avatar, email }) {
    const token = localStorage.getItem("jwt");
    const data = { name, avatar, email };
    const response = await api("PATCH", "users/me", token, data);
    if (response.ok) {
      const updatedInfo = await response.json();
      setActiveModal(null);
      setCurrentUser(updatedInfo);
    } else {
      console.error(`Couldn't update profile: ${response.status}`);
    }
  }

  function getInitials(fullName) {
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
            getInitials={getInitials}
            weatherTemp={weatherTemp}
            weatherLocation={weatherLocation}
            handleAddClick={() => setActiveModal("create")}
          />
          <Route exact path="/">
            <Main
              weatherTemp={weatherTemp}
              timeOfDay={timeOfDay()}
              onCardClick={onCardClick} //handle selected card
              clothingArray={clothingArray}
              clothingArr={clothingArray}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile
              onCardClick={onCardClick}
              clothingArray={clothingArray}
              handleAddClick={() => toggleModal("addItem")}
              handleLogoutClick={() => toggleModal("logout", "Log Out")}
              handleEditProfileClick={() => toggleModal("edit profile")}
              onCardLike={handleLikeClick}
              getInitials={getInitials}
            />
          </ProtectedRoute>
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
          {activeModal === "edit profile" && (
            <EditProfileModal
              onClose={() => toggleModal("edit profile")}
              isOpen={activeModal === "edit profile"}
              handleProfileUpdate={handleProfileUpdate}
            />
          )}
          {activeModal === "logout" && (
            <ConfirmLogoutModal
              onClose={toggleModal}
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
