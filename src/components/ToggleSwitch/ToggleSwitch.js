import React from "react";
import "./ToggleSwitch.css";
const ToggleSwitch = () => {
  console.log("Toggle");
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleChange}
      ></input>
      <span></span>
      <p>F</p>
      <p>C</p>
    </label>
  );
};
export default ToggleSwitch;
