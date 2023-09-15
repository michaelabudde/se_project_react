import React from "react";
import "./Header.css";
import navigation from "./Navigation.css";
import logo from "../../images/WTWRlogo.svg";
import avatar from "../../images/avatar.svg";

const Header = ({ weatherTemp, weatherLocation, onCreateModal }) => {
  if (!weatherTemp) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = "Terrence Tegegne";
  const avatar = "";
  const isAvatarSet = Boolean(avatar); // Define isAvatarSet based on the presence of an avatar

  return (
    <header className="header">
      <div className="header__container">
        <img
          src={require("../../images/WTWRlogo.svg").default}
          alt="What to Wear logo"
          className="header__logo"
        />
        <p className="header__date">
          {currentDate}, {weatherLocation}
        </p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              <button onClick={onCreateModal} className="navigation__button">
                + Add Clothes
              </button>
            </li>
            <li>
              <div className="navigation__link">
                {username}
                {avatar ? (
                  <span
                    className={`navigation__user ${
                      isAvatarSet ? "navigation__user_avatar" : ""
                    }`}
                  >
                    <img
                      className="navigation__user"
                      src={require("../../images/avatar.svg").default}
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
