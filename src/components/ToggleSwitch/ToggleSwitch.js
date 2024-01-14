import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
const ToggleSwitch = () => {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <>
      <label className="switch__box" htmlFor={`react-switch-new`}>
        <input
          type="checkbox"
          className="switch"
          id={`react-switch-new`}
          onChange={handleToggleSwitchChange}
        />
        <span className="switch__text switch__temp-F">F</span>
        <span className="switch__text switch__temp-C"> C </span>
        <span className={`switch__slider`}></span>
      </label>
    </>
  );
};
export default ToggleSwitch;
