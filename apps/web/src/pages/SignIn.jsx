import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../static/logo.png";
import Cookies from "js-cookie";
import { UserContext, UserContextProvider } from "../contexts/UserContext";



export const validateValues = (inputValues) => {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errors = {};

    if (!inputValues.email)
        errors.email = "Email is required";
    else if (!validRegex.test(inputValues.email.toLowerCase())) {
        errors.email = "Invalid Email";
    }

    if (!inputValues.password)
        errors.password = "Password is required";

    return errors;
};


export default function SignIn() {
    const navigate = useNavigate();

    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const [inputFields, setInputFields] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [formMessage, setFormMessage] = useState(' ');
    const [submitting, setSubmitting] = useState(false);
    const { token, setToken } = useContext(UserContext);



    const Signin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: inputFields.email,
                password: inputFields.password
            })
        };
        const response = await fetch("http://localhost:3000/auth/login", requestOptions);
        const data = await response.json();

        if (response.ok) {
            // setToken(data.token);
            Cookies.set("token", data.token);
            Cookies.set("authenticated", true);
            navigate("/");
        }
        else {
            setFormMessage("Invalid Email or Password");
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            Signin();
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
                    <div className="form-inputs-container">
                        <br /><br />
                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="text" name="email" className="input" value={inputFields.email} onChange={handleChange}></input>
                                <label className="label">Email </label>
                            </div>
                            <label className="error">{errors.email}</label>
                        </div>
                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="password" name="password" className="input"
                                    value={inputFields.password} onChange={handleChange} />
                                <label className="label">Password</label>
                            </div>
                            <label className="error">{errors.password}</label>
                        </div>
                    </div>
                    <div className="form-error-container">
                        <label className="form-error">{formMessage}</label>
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
