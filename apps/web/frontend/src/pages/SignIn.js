import { useState, useEffect } from "react";
import AuthNavBar from "../components/AuthNavBar";

import logo from "../logo.png";
import SignUp from "./SignUp";





export default function SignIn() {
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
    const [inputFields, setInputFields] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let errors = {};

        if (!inputFields.email)
            errors.email = "Email is required";
        else if (!validRegex.test(inputFields.email.toLowerCase())) {
            errors.email = "Invalid Email";
        }
        if (!inputFields.password)
            errors.password = "Password is required";

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    };

    const finishSubmit = () => {
        console.log(inputFields);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);
    return (
        <>
            <br />
            <h1 className="h1">Sign In</h1>
            <hr className="hr" />

            <div className="form">
                <form onSubmit={handleSubmit}>
                    <img src={logo} id="logo-form" />
                    <div className="input-container">
                        <br /><br />
                        <div className="input-error-container">
                            <input type="text" name="email" placeholder="Email" className="input"
                                value={inputFields.email} onChange={handleChange}></input>
                            <label className="errors">{errors.email}</label>
                        </div>
                        <div className="input-error-container">
                            <input type="password" placeholder="Password" name="password" className="input"
                                value={inputFields.password} onChange={handleChange} />
                            <label className="errors">{errors.password}</label>
                        </div>
                    </div>

                    <div className="button-container">
                        <input type="submit" className="button-5" value={"Sign In"} />
                    </div>
                    <br />
                </form>
                <label> Don't have an account? </label>
                <a id="link" href="/SignUp"> Sign Up</a>

            </div>
        </>
    )

}
