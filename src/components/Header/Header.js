import React from "react";
import Header from "../Header/Header.css";
import Navigation from "../Header/Navigation.css";
import logo from "./public/images/WTWRlogo.svg";
import avatarDefault from "./public/images/avatar.svg";

const Header = ({ weatherData, handleAddClick }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = "Terence Tegegne";
  const avatar = "";

  return (
    <header className="header">
      <div className="header__container">
        <img
          src="./images/WTWRlogo.svg"
          alt="What to Wear logo"
          className="header__logo"
        />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              <button onClick={handleAddClick} className="navigation__button">
                + Add Clothes
              </button>
            </li>
            <li>
              <div className="navigation__link">
                {username}
                {avatar ? (
                  <img
                    className="navigation__user"
                    src="./images/avatar.svg"
                    alt="user avatar"
                  ></img>
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
