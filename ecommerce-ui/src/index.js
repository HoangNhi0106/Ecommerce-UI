import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ConfirmProvider from './store/ConfirmContext'
import ConfirmModel from './components/confirm model/ConfirmModel';

ReactDOM.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>,*/
  <ConfirmProvider>
    <App/>
  </ConfirmProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();