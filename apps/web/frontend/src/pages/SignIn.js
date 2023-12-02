import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../static/logo.png";
import Cookies from "js-cookie";
// import { UserContext } from "../Contexts/UserContext";




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
    const [validationError, setValidationError] = useState(' ');
    // const [, setToken] = useContext(UserContext);
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
        Signin();
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);

    const Signin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: inputFields.email,
                password: inputFields.password
            })

        };
        const response = await fetch("http://localhost:3000/users/login", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setValidationError("Invalid Email or Password");
        }
        else {
            Cookies.set("token", data);
            Cookies.set("authenticated", true);
            navigate("/Model");
        }
    }

    return (
        <>
            <br />
            <h1 className="h1">Sign In</h1>
            <hr className="hr" />

            <div className="form">
                <form onSubmit={handleSubmit}>
                    <img src={logo} id="logo-form" />
                    <div className="error-container">
                        <label className="val-error">{validationError}</label>
                    </div>
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
