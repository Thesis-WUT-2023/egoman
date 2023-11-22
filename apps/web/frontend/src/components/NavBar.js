import logo from '../logo.png';



export default function NavBar()  {
    return (
        <nav className="nav">
          <img src={logo} className="logo" alt="logo" />
          <ul>
            <li><a href="/Model">Model</a></li>
            <li><a href='/User'>Account</a></li>
            <li><a href='/SignIn'>Sign Out</a></li>

          </ul>
         
        </nav>
    
    );
  };