import { createContext, useState, useEffect, useContext } from "react";
// import { fetchUserInfo } from "../utils/api.js";
// import { CurrentUserContext } from "./CurrentUserContext.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  // const { setCurrentUser } = useContext(CurrentUserContext);

  // useEffect(() => {
  //   const checkAuthToken = async () => {
  //     const storedToken = localStorage.getItem("jwt");
  //     try {
  //       if (storedToken) {
  //         // Set loading to true while fetching user info
  //         setIsLoggedInLoading(true);

  //         // Fetch user info and update current user
  //         const userInfo = await fetchUserInfo(storedToken);
  //         setCurrentUser(userInfo);
  //         setIsLoggedIn(true);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user info:", error);
  //     } finally {
  //       // Whether successful or not, set loading to false
  //       setIsLoggedInLoading(false);
  //     }
  //   };

  //   checkAuthToken();
  // }, [setIsLoggedIn, setIsLoggedInLoading, setCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
