import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import "../styles/main.scss";
import "./scripts/animation.js";
import "./scripts/jqBootstrapValidation.js";
import "./scripts/contact_me.js";

import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import store from "./store"
import App from "./components/App"

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);