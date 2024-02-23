import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { login as loginConfig, signup as signupConfig } from "../utils/auth";

const useAuth = (toggleModal, fetchUserInfo) => {
  const { setIsLoggedIn, setIsLoggedInLoading } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [response, setResponse] = useState("");

  const handleLogIn = async ({ email, password }) => {
    const config = loginConfig(email, password);
    try {
      const res = await api("POST", "/login", "", config);
      // Check if the response contains a token
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        // Set loading to true while fetching user info
        setIsLoggedInLoading(true);
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
    } finally {
      // Whether successful or not, set loading to false
      setIsLoggedInLoading(false);
    }
  };

  const handleSignUp = async ({ name, avatar, email, password }) => {
    const config = signupConfig(name, avatar, email, password);
    try {
      const res = await api("POST", "/signup", "", config);

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
  return { handleLogIn, handleSignUp, handleLogout, response };
};

export default useAuth;
