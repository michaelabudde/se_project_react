import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";
import "./Navigation.css";
import avatar from "../../images/avatar.svg";
import WTWRlogo from "../../images/WTWRlogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ weatherTemp, weatherLocation, onCreateModal }) => {
  if (!weatherTemp) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = "Terrence Tegegne";
  const isAvatarSet = Boolean(avatar); // Define isAvatarSet based on the presence of an avatar

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img
            src={WTWRlogo}
            alt="What to Wear logo"
            className="header__logo"
          />
        </Link>{" "}
        <p className="header__date">
          {currentDate}, {weatherLocation}
        </p>
      </div>
      <div className="header__nav">
        <ToggleSwitch />
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
      </div>
    </header>
  );
};
export default Header;
