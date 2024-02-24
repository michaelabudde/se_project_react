import React, { useContext } from "react";
// import { AuthContext } from "./AuthContext";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, isLoggedInLoading, ...props }) {
  console.log({ isLoggedIn, isLoggedInLoading });

  return isLoggedInLoading ? null : (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
