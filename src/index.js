// @flow
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Auth0ProviderWithHistory from "./components/auth/auth0_provider_with_history";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
