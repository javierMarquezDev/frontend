import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GatherGroups from './Groups';
import LoginForm from './App';
import reportWebVitals from './reportWebVitals';
import Button from '@mui/material/Button';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

localStorage.setItem("token",null);
localStorage.setItem("usuario",null);

ReactDOM.render(
  <BrowserRouter>
    <App>
      
    </App>
    <Routes>
          <Route path="/" element={<App />}/>      
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
