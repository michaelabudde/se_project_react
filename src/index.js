import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import "../src/index.css";
import { HashRouter, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ResponseProvider } from "./contexts/ResponseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <HashRouter basename={"/se_project_react"}>
      <Switch>
        <ResponseProvider>
          <AuthProvider>
            <CurrentUserProvider>
              <App />
            </CurrentUserProvider>
          </AuthProvider>
        </ResponseProvider>
      </Switch>
    </HashRouter>
  </>
);

reportWebVitals();
