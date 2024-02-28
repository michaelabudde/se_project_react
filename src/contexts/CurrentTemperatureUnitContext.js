import { createContext } from "react";

export const CurrentTemperatureUnitContext = createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

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
