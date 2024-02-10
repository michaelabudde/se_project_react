import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  ); // const handleChange = (e) => {
  //   if (currentTemperatureUnit === "C") {
  //     handleToggleSwitchChange("F");
  //   } else if (currentTemperatureUnit === "F") {
  //     handleToggleSwitchChange("C");
  //   }
  // };
  // const handleChange = () => {
  //   handleToggleSwitchChange((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  // };
  const handleChange = handleToggleSwitchChange;
  return (
    <div className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleChange}
      ></input>
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
