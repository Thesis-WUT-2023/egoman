import { useNavigate } from 'react-router-dom';

import '../Styles/NavBar.css';
import logo from '../static/logo.png';
import Cookies from 'js-cookie';

function myFunction() {
  var x = document.getElementById("navBar");

  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

export default function NavBar() {
  const navigate = useNavigate();

  const ClearCookies = event => {
    Cookies.set("authenticated", false);
    Cookies.set("token", "");
    Cookies.set("email", false);
    Cookies.set("name", "");
    Cookies.set("surname", "");
  };


  return (
    <nav className="nav" id='navBar'>
      <img src={logo} className="logo" alt="logo" />
      <ul>
        <li><a href="/Model">Model</a></li>
        <li><a href='/Account'>Account</a></li>
        <li><a href='/SignIn' onClick={ClearCookies}>Sign Out</a></li>
      </ul>
    </nav>

  );
};



