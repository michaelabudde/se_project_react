import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AuthContext } from "../contexts/AuthContext";
import { api, fetchUserInfo } from "../utils/api";
import { login as loginConfig, signup as signupConfig } from "../utils/auth";

const useAuth = (handleCloseModal) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [errorResponse, setErrorResponse] = useState("");
  // changed from response to be more specific
  const [signupError, setSignupError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  // debugger;
  const handleLogIn = async ({ email, password }) => {
    const config = loginConfig(email, password);
    try {
      const res = await api("POST", "/signin", "", config);
      // Check if the response contains a token
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);

        // Fetch user info and update current user
        const userInfo = await fetchUserInfo(res.token);
        setCurrentUser(userInfo);

        handleCloseModal(""); // does it need to handle close if subit already handles close?
      } else {
        console.error(res.message);
        setErrorResponse(res.message || "Log in failed");
        setLoginError(res.message || "Wrong email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(error.message);
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
        handleCloseModal("");
      } else {
        console.error(res.message);
        setErrorResponse(res.message || "Sign up failed");
        setSignupError(res.message || "Email already in use");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setSignupError(error.message);
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentUser({ avatar: "T T" });
    handleCloseModal("");
  };

  return {
    handleLogIn,
    handleSignUp,
    handleLogout,
    errorResponse,
    setErrorResponse,
    signupError,
    setSignupError,
    loginError,
    setLoginError,
  };
};

export default useAuth;
