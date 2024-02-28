import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit); // logged
  console.log(handleToggleSwitchChange);
  // const handleChange = () => {
  //   console.log("Toggle Switch Clicked"); // logged
  //   handleToggleSwitchChange();
  // };
  return (
    <div
      className="switch"
      onClick={handleToggleSwitchChange}
      onChange={handleToggleSwitchChange}
    >
      <input type="checkbox" className="switch__box"></input>
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" ? "switch__active" : "switch__none"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" ? "switch__active" : "switch__none"
        }`}
      >
        C
      </p>
    </div>
  );
};
export default ToggleSwitch;
