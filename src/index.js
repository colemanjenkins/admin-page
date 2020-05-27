import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyA_nwXY1HdJ7U9Ho3VVxty-ZKTI0PCrgqE',
  authDomain: "admin-elementary-page.firebaseapp.com",
  databaseURL: "https://admin-elementary-page.firebaseio.com",
  projectId: "admin-elementary-page",
  storageBucket: "admin-elementary-page.appspot.com",
  messagingSenderId: "895991781999",
  appId: "1:895991781999:web:33264fc251670ece9d0b9a",
  measurementId: "G-2HV7642M68"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
