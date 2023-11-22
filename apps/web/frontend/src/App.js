
import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import logo from './logo.png';
import NavBar from './components/NavBar';
import AuthNavBar from './components/AuthNavBar'
import Model from './pages/Model'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
//import api from './api'
import "./Styles.css"




export default function App() {
// const [transactions,setTransactions] = useState([]);
// const [formData, setFormData] = useState({

// })
// const fetchTransactions = async() => {
// const response = await api.get('/transactions/');
// setTransactions (response.data)
// };
// useEffect (()  => {
//   fetchTransactions();
// }, []);

  let Component;
  switch(window.location.pathname){
    case "/":
      Component = Model;
      break;
    case "/Model":
      Component = Model;
      break;
    case "/SignIn":
      Component = SignIn;
      break;
    case "/SignUp":
      Component = SignUp;
      break;
    case "/User":
    Component = Account;
    break;
      break
  }

  return (
    <>
      <Component />
    </>
  )
}
