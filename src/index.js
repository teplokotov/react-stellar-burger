import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';

// Turn on Redux Devtools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Apply middleware "thunk"
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Store initialization with "reducers" and "enhancer".
// "rootReducer" allow to combine several reducers
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/*
          Allow to use "store" by Redux Provider (using React Context)
          as props at each level of the hierarchy
      */}
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
