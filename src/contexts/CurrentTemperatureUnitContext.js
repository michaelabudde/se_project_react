import { createContext, useState } from "react";

// Creating the context with default values
export const CurrentTemperatureUnitContext = createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

// Creating the provider component
export const CurrentTemperatureUnitProvider = ({ children }) => {
  // State variable and function for managing temperature unit
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Function for handling toggle switch change
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  // Providing the state and function through the context
  const contextValue = {
    currentTemperatureUnit,
    handleToggleSwitchChange,
  };

  return (
    <CurrentTemperatureUnitContext.Provider value={contextValue}>
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};

// attempted new code:
// import { createContext, useState } from "react";
// const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

// const handleToggleSwitchChange = () => {
//   setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
// };
// export const CurrentTemperatureUnitContext = createContext({
//   currentTemperatureUnit: "F",
//   handleToggleSwitchChange: () => {},
// });

// My original code :

// import React, { useState } from "react";

// const CurrentTemperatureUnitContext = React.createContext({
//   currentTemperatureUnit: "",
//   handleToggleSwitchChange: () => {},
// });
// // CurrentTemperatureUnitContext
// const CurrentTemperatureUnitProvider = ({ children }) => {
//   const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

//   const handleToggleSwitchChange = () => {
//     setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
//   };

//   return (
//     <CurrentTemperatureUnitContext.Provider
//       value={{ currentTemperatureUnit, handleToggleSwitchChange }}
//     >
//       {children}
//     </CurrentTemperatureUnitContext.Provider>
//   );
// };

// export { CurrentTemperatureUnitProvider, CurrentTemperatureUnitContext };
