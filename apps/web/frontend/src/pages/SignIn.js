import { useEffect } from "react";
import AuthNavBar from "../components/AuthNavBar";



export default function SignIn(){
    useEffect(() => {
        // Get the <a> element by its id
        const myLinkElement = document.getElementById('Auth');
    
        // Check if the element exists
        if (myLinkElement) {
          // Change the href attribute of the <a> element
        myLinkElement.href = '/SignUp';
        myLinkElement.textContent = "Sign Up"
        } else {
        console.error("Element with id 'myLink' not found.");
        }
    }, []);

    return (
        <>
        <AuthNavBar />
        <h1 className="h1">Sign In</h1>
        <hr className="hr"/>
        <br/>
        <div className="form">
            <form>
                <div className="input-container">
                    <br/><br/>
                    <input type="text" name="uname" placeholder="Email" required className="input"></input>           
                    <input type="password" placeholder="Password" name="pass" required className="input"/>
                </div>
                <br/><br/>
        <div className="button-container">
        <input type="submit" className="button-5" value={"Sign In"} />
        </div>
        </form>
        </div>
        </>
    )
    
}
