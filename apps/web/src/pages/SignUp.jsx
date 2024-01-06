import { useState, useEffect, useContext } from "react";
import logo from "../static/logo.png"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const validateValues = (inputValues) => {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errors = {};

    if (!inputValues.name)
        errors.name = "Name is required";
    if (!inputValues.surname)
        errors.surname = "Surname is required";

    if (!inputValues.email)
        errors.email = "Email is required";
    else if (!validRegex.test(inputValues.email)) {
        errors.email = "Invalid Email";
    }

    if (!inputValues.password)
        errors.password = "Password is required";
    else if (inputValues.password.length < 8) {
        errors.password = "Password is short";
    }
    if (!inputValues.repassword)
        errors.repassword = "Verify the password";
    else if (inputValues.password !== inputValues.repassword) {
        errors.repassword = "Passwords do not match";
    }

    return errors;
};


export default function SignUp() {
    const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repassword: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repassword: "",
    });
    const [formMessage, setFormMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);



    const Signup = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: inputFields.email,
                password: inputFields.password,
                name: inputFields.name,
                surname: inputFields.surname
            }),
        };

        const response = await fetch("http://localhost:3000/auth/signup", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setFormMessage("User already Exists");
        } else {
            Cookies.set("token", data.token);
            Cookies.set("authenticated", true);
            navigate("/Model");
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields))
        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            SignUp();
        }
    }, [errors]);



    return (
        <>
            <h1 className="h1">Sign Up</h1>
            <hr className="hr"></hr>
            <div className="form">

                <form onSubmit={handleSubmit}>
                    <img src={logo} id="logo-form" alt="Egoman-Logo"></img>
                    <div className="form-inputs-container">
                        <br />

                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="text" name="name" className="input" value={inputFields.name} onChange={handleChange} />
                                <label className="label">Name</label>
                            </div>
                            <label className="error">{errors.name}</label>
                        </div>

                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="text" name="surname" className="input" value={inputFields.surname} onChange={handleChange} />
                                <label className="label">Surname</label>
                            </div>
                            <label className="error">{errors.surname}</label>
                        </div>

                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="text" name="email"
                                    className="input" value={inputFields.email} onChange={handleChange} />
                                <label className="label">Email</label>
                            </div>
                            <label className="error">{errors.email}</label>
                        </div>

                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="password" name="password"
                                    className="input" value={inputFields.password} onChange={handleChange} />
                                <label className="label">Password</label>
                            </div>
                            <label className="error">{errors.password}</label>
                        </div>
                        <div className="input-error-container">
                            <div className="input-label-container">

                                <input type="password" name="repassword"
                                    className="input" value={inputFields.repassword} onChange={handleChange} />
                                <label className="label">Repeat Password</label>
                            </div>
                            <label className="error">{errors.repassword}</label>
                        </div>
                    </div>
                    <br />
                    <div className="form-error-container">
                        <label className="form-error">{formMessage}</label>
                    </div>
                    <div className="button-container">
                        <input type="submit" className="button-5" value="Sign Up" />
                    </div>
                </form>
                <label>Have an account? </label>
                <a id="link" href="/SignIn"> Sign In</a>
            </div>
        </>
    )

}

