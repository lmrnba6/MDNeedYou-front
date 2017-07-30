import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import 'react-hot-loader/patch';
import "../source/styles/main.scss";


import "./js/scripts/animation.js";
import "./js/scripts/jqBootstrapValidation.js";
import "./js/scripts/contact_me.js";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./js/store";
import App from "./js/components/App";


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


