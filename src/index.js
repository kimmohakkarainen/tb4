import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Promise from "core-js/features/promise";
import Object from "core-js/features/object";

import poriState from "./reducers";

const store = createStore(
  poriState,
  composeWithDevTools(applyMiddleware(thunk))
  /* applyMiddleware(thunk) */
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
