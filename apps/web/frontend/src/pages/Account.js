import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";



export default function Account() {
    const [inputFields, setInputFields] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repassword: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repassword: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let errors = {};

        if (!inputFields.name)
            errors.name = "Name is required";
        if (!inputFields.surname)
            errors.surname = "Surname is required";

        if (!inputFields.email)
            errors.email = "Email is required";
        if (!validRegex.test(inputFields.email)) {
            errors.email = "Invalid Email";
        }

        if (!inputFields.password)
            errors.password = "Password is required";
        else if (inputValues.password.length < 8) {
            errors.password = "Password is short";
        }
        if (!inputFields.repassword)
            errors.repassword = "Verify the Password";
        else if (inputValues.password != inputValues.repassword) {
            errors.repassword = "Passwords do not match";
        }

        return errors;
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
            <NavBar />
            <h1 className="h1">User Account</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <p className="">Edit Your information</p>
                    <div className="input-container">
                        <br />
                        <div className="input-error-container">
                            <input type="text" name="name" placeholder="Name"
                                className="input" value={inputFields.name} onChange={handleChange} />
                            <label className="errors">{errors.name}</label>
                        </div>
                        <div className="input-error-container">
                            <input type="text" name="surname" placeholder="Surname"
                                className="input" value={inputFields.surname} onChange={handleChange} />
                            <label className="errors">{errors.surname}</label>
                        </div>
                        <div className="input-error-container">
                            <input type="text" name="email" placeholder="Email"
                                className="input" value={inputFields.email} onChange={handleChange} />
                            <label className="errors">{errors.email}</label>
                        </div>
                        <div className="input-error-container">
                            <input type="password" placeholder="Password" name="password"
                                className="input" value={inputFields.password} onChange={handleChange} />
                            <label className="errors">{errors.password}</label>
                        </div>
                        <div className="input-error-container">
                            <input type="password" placeholder="Repeat Password" name="repassword"
                                className="input" value={inputFields.repassword} onChange={handleChange} />
                            <label className="errors">{errors.repassword}</label>
                        </div>
                    </div>
                    <br />
                    <div className="button-container">
                        <input type="submit" className="button-5" />
                    </div>
                </form>
            </div>
        </>
    )
}
