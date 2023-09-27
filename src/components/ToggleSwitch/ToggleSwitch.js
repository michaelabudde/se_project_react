import React, { useState } from "react";
import "./ToggleSwitch.css";
const ToggleSwitch = () => {
  console.log("Toggle");
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");
  const handleChange = (e) => {
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };
  return (
    <label className="switch">
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
    </label>
  );
};
export default ToggleSwitch;
