import { useState, useContext, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { login as loginConfig, signup as signupConfig } from "../utils/auth";

const useAuth = (toggleModal) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [response, setResponse] = useState("");

  const handleLogIn = async ({ email, password }) => {
    const config = loginConfig(email, password);
    try {
      const res = await api("POST", "login", "", config);

      // Check if the response contains a token
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);

        // Fetch user info and update current user
        const userInfo = await fetchUserInfo(res.token);
        setCurrentUser(userInfo);

        toggleModal("login");
      } else {
        console.error(res.message);
        setResponse(res.message || "Log in failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignUp = async ({ name, avatar, email, password }) => {
    const config = signupConfig(name, avatar, email, password);
    try {
      const res = await api("POST", "signup", "", config);

      // Check if the response is successful
      if (res.data) {
        // SignUp successful, proceed to login
        await handleLogIn({ email, password });
        toggleModal("signup");
      } else {
        console.error(res.message);
        setResponse(res.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentUser({ avatar: "T T" });
    toggleModal("logout");
  };

  const fetchUserInfo = useCallback(
    async (token) => {
      try {
        const response = await api("GET", "/user/me", token); // changed to /user/me ?
        if (response.ok) {
          const userInfo = await response.json();
          console.log("User Info:", userInfo);
          setCurrentUser(userInfo);
          return userInfo;
        } else {
          console.error(`Can't access user. Error: ${response.status}`);
          return null;
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    },
    [setCurrentUser]
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    }
  }, [fetchUserInfo, setIsLoggedIn]);

  return { handleLogIn, handleSignUp, handleLogout, response };
};

export default useAuth;
