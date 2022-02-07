import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Switch as Routes,
  Route
} from "react-router-dom";
import GroupTest from './controller/groupTest.controller';
import LoginForm from './components/LoginForm.component';
import Home from './components/Home.component';
import Index from './components/Index.component';

ReactDOM.render(
  
  
      
    
    <BrowserRouter>
      <App>
      </App>
      <Routes>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/grouptest">
            <GroupTest />
          </Route>
          
      </Routes>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
