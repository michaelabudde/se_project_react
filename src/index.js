import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import "../src/index.css";
import { HashRouter, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter basename={"/se_project_react"}>
      <Switch>
        <AuthProvider>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </AuthProvider>
      </Switch>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
