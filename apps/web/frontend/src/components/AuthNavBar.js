import logo from '../static/logo.png'


export default function AuthNavBar(){
    return (
        <nav className="nav">
          <img src={logo} className="logo" alt="logo" />
          <ul>
            {/* <li><a href="/Model">Model</a></li> */}
            <li><a id='Auth' href='/SignUp'></a></li>
          </ul>
        </nav>
    
    );
}