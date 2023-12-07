import { useNavigate } from 'react-router-dom';

import '../Styles/NavBar.css';
import logo from '../static/logo.png';
import Cookies from 'js-cookie';



export default function NavBar() {
  const navigate = useNavigate();
  const SignOut = event => {
    Cookies.set("authenticated", false);
    Cookies.set("token", "");
  };
  return (
    <nav className="nav">
      {/* <img src={logo} className="logo" alt="logo" />
      <div class="icon-bar">
        <a class="active" href="/Model"><i class="fa fa-home"></i></a>
        <a href="/Account"><i class="fa fa-user"></i></a>
      </div > */}

      <img src={logo} className="logo" alt="logo" />
      <ul>
        <li><a href="/Model">Model</a></li>
        <li><a href='/Account'>Account</a></li>
        <li><a href='/SignIn' onClick={SignOut}>Sign Out</a></li>
      </ul>
    </nav>
  );
};



