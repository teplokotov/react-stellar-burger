import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'; // Trick: HashRouter for deploying at gh-pages
// import {BrowserRouter as Router} from 'react-router-dom';
import { store } from "./services/store";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
