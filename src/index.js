import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./Components/App";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
