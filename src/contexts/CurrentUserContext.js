import React, { createContext, useContext, useState } from "react";

// Create the context
export const CurrentUserContext = createContext();

// Create a custom hook to use the context
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

// Create the context provider
export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: "Current User",
    avatar: null,
  });

  // Provide the value of the context
  const contextValue = { currentUser, setCurrentUser };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
