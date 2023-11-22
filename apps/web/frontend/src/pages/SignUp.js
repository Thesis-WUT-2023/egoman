import { useEffect } from "react";
import AuthNavBar from "../components/AuthNavBar"
import NavBar from "../components/NavBar"
export default function SignUp(){
    useEffect(() => {
        // Get the <a> element by its id
        const myLinkElement = document.getElementById('Auth');
    
        // Check if the element exists
        if (myLinkElement) {
          // Change the href attribute of the <a> element
          myLinkElement.href = '/SignIn';
          myLinkElement.textContent = "Sign In"
        } else {
          console.error("Element with id 'myLink' not found.");
        }
      }, []);
      return (
        <>
        <AuthNavBar />
        <h1 className="h1">Sign Up</h1>
        <hr className="hr"></hr>
        <br></br>
        <div className="form">
            <form>
                <div className="input-container">
                    <br/>
                    <input type="text" name="uname" placeholder="Name" required className="input"></input>   
                    <input type="text" name="uname" placeholder="Surname" required className="input"></input>   
                    <input type="text" name="uname" placeholder="Email" required className="input"></input>           
                    <input type="password" placeholder="Password" name="pass" required className="input"/>
                    <input type="password" placeholder="Repeat Password" name="pass" required className="input"/>
                </div>
                <br/>
        <div className="button-container">
        <input type="submit" className="button-5" value="Sign Up"/>
        </div>
        </form>
        </div>
        </>
    )
}
