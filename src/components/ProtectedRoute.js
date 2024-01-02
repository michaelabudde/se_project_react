import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
