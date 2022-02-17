import React from "react";
import ReactDOM from "react-dom";

// Import css all modules
import "./styles/global-variables.css";
import "./index.css";
import "./styles/utils.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
