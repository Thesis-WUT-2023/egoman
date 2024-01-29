import { useNavigate } from 'react-router-dom';

import '../styles/NavBar.css';
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
  };


  return (

    <div className="navbar">
      <img src={logo} className='logo' alt='logo' />
      <div className="dropdown">
        <button className="dropbtn">
          <i className="fa fa-lg fa-user"></i>
        </button>
        <div className="dropdown-content">
          <a href="/Account">Profile</a>
          <a href="/Password">Change password</a>
          <a href="/SignIn" onClick={ClearCookies}>Sign Out</a>
          


        </div>
      </div>
      <a href="/">Home</a>

    </div>
    // <nav className="nav" id='navBar'>
    //   <img src={logo} className="logo" alt="logo" />
    //   <ul>
    //     <li><a href="/Model">Model</a></li>
    //     <li><a href='/Account'>Account</a></li>
    //     <li><a href='/SignIn' onClick={ClearCookies}>Sign Out</a></li>
    //   </ul>
    // </nav>

  );
};



