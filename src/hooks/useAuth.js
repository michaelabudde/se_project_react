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
    const res = await api("POST", "signin", "", config);

    // Check if the response contains a token
    if (res.token) {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      fetchUserInfo(res.token);
      toggleModal("login");
    } else {
      console.error(res.message);
      setResponse(res.message || "Log in failed");
    }
  };

  const handleSignUp = async ({ name, avatar, email, password }) => {
    const config = signupConfig(name, avatar, email, password);
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
      const res = await api("GET", "user/me", token);

      // Check if the response is successful
      if (res.data) {
        setCurrentUser(res.data);
      } else {
        console.error(res.message);
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
