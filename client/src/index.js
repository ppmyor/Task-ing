import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";
import promiseMiddleware from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);
