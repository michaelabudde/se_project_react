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
  fetchUserInfo,
  /*   isLoggedIn, */ // not defined in app ?
  weatherLocation,
  handleClick,
  handleAddClick,
  /*   getInitials, */
}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token && isLoggedIn) {
          const userInfo = await fetchUserInfo(token);
          setCurrentUser(userInfo);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [fetchUserInfo, setCurrentUser, isLoggedIn]);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = currentUser ? currentUser.name : "Terrence Tegegne";
  console.log("Current User:", currentUser);
  console.log("Username:", username);

  const isAvatarSet = Boolean(avatar); // Define isAvatarSet based on the presence of an avatar

  const loggedInHeader = (
    <nav className="navigation">
      <ul className="navigation__container">
        <li>
          <button onClick={handleAddClick} className="navigation__button">
            + Add Clothes
          </button>
        </li>
        <li>
          <div className="navigation__link">
            <Link className="header__username" to="/profile">
              {username}
            </Link>
            <Link className="header__avatar" to="/profile">
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
                username?.toUpperCase().charAt(0) || ""
              )}
            </Link>
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
