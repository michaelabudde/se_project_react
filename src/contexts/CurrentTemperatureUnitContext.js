import React from "react";

export const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

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
