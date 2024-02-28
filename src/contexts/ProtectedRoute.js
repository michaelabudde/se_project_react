import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, isLoggedInLoading, ...props }) {
  return isLoggedInLoading ? null : (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
