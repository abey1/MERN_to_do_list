import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
