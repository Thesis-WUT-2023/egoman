import { useNavigate } from 'react-router-dom';
import logo from '../static/logo.png';
import Cookies from 'js-cookie';



export default function NavBar() {
  const navigate = useNavigate();
  const SignOut = event => {
    
    console.log(Cookies.get("authenticated"));
    Cookies.set("authenticated", false);
    
  };
  return (
    <nav className="nav">
      <img src={logo} className="logo" alt="logo" />
      <ul>
        <li><a href="/Model">Model</a></li>
        <li><a href='/Account'>Account</a></li>
        <li><a href='/SignIn' onClick={SignOut}>Sign Out</a></li>
      </ul>
    </nav>
  );
};