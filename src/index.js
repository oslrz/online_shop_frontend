import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import App from "./pages/App";
import FrontPage from "./pages/frontPage/FrontPage";

ReactDOM.render(
  <div>
    <FrontPage />
  </div>,
  document.getElementById("root")
);
