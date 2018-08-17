import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import App from "./app.jsx";
import "../styles/index.scss";


ReactDOM.render(<App />, document.getElementById("app"));
