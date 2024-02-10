// import React from "react";
// const CurrentTemperatureUnitContext = React.createContext({
//   currentTemperatureUnit: "",
//   handleToggleSwitchChange: () => {},
// });
// export { CurrentTemperatureUnitContext };
import React, { useState } from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};

export { CurrentTemperatureUnitProvider, CurrentTemperatureUnitContext };
