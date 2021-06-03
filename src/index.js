import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Clientes from './Pages/Clientes';
import Editar from './Pages/Editar';
import {CrudProvider} from "../src/Context/context"; 
import Login from './Pages/Login';

ReactDOM.render(
   <React.StrictMode>
      <CrudProvider>
         <Router>
            <Route exact path="/" component={App} />
            <Route path="/home" component={Clientes} />
            <Route path="/editar/:id" component={Editar} />
            <Route path="/login" component={Login}/>
         </Router>
      </CrudProvider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
