import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";
import "./Navigation.css";
import { baseUrl } from "../../utils/constants.js";
import avatar from "../../images/avatar.svg";
import WTWRlogo from "../../images/WTWRlogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext.js";
import { processServerResponse } from "../../utils/api";
const Header = ({
  weatherTemp,
  weatherLocation,
  handleClick,
  onCreateModal,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/me`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(processServerResponse);
        const userData = await response.json();
        setCurrentUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    if (isLoggedIn) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, setCurrentUser]);
  /*   if (!weatherTemp || loading) return null; */
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = currentUser ? currentUser.name : "Terrence Tegegne";
  const isAvatarSet = Boolean(avatar); // Define isAvatarSet based on the presence of an avatar

  const loggedInHeader = (
    <nav className="navigation">
      <ul className="navigation__container">
        <li>
          <button onClick={onCreateModal} className="navigation__button">
            + Add Clothes
          </button>
        </li>
        <li>
          <div className="navigation__link">
            <Link className="header__username" to="/profile">
              {username}
            </Link>
            {avatar ? (
              <span
                className={`navigation__user ${
                  isAvatarSet ? "navigation__user_avatar" : ""
                }`}
              >
                <img
                  className="navigation__user"
                  src={avatar}
                  alt="user avatar"
                ></img>
              </span>
            ) : (
              <span className="navigation__user navigation__user_type_none">
                {username?.toUpperCase().charAt(0) || ""}
              </span>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
  const loggedOutHeader = (
    <>
      <button
        className="navigation__button"
        onClick={() => handleClick("signup")}
      >
        Sign Up
      </button>
      <button
        className="navigation__button"
        onClick={() => handleClick("login")}
      >
        Log In
      </button>
    </>
  );
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img
            src={WTWRlogo}
            alt="What to Wear logo"
            className="header__logo"
          />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherLocation}
        </p>
      </div>
      <div className="header__nav">
        <ToggleSwitch />
        {isLoggedIn ? loggedInHeader : loggedOutHeader}
      </div>
    </header>
  );
};
export default Header;
