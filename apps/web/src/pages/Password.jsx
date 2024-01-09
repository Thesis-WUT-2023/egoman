import NavBar from "../components/NavBar";
import { useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import '../styles/Account.css';
import DeleteConfirmation from "../components/DeleteConfirmation";



export const validateValues = (inputValues) => {
    let errors = {};

    if (!inputValues.oldPassword)
        errors.oldPassword = "Old password is required";

    if (!inputValues.newPassword)
        errors.newPassword = "New password is required";
    else if (inputValues.newPassword.length < 8)
        errors.newPassword = "Password is short"
    if (!inputValues.repassword)
        errors.repassword = "Verify the Password";
    else if (inputValues.newPassword != inputValues.repassword) {
        errors.repassword = "Passwords do not match";
    }

    return errors;
};

const SignOut = () => {
    Cookies.set("authenticated", false);
    Cookies.set("token", "");
    Cookies.set("email", false);
    Cookies.set("name", "");
    Cookies.set("surname", "");
}

export default function Password() {
    const navigate = useNavigate();


    const [authenticated, setAuthenticated] = useState(null);
    const [inputFields, setInputFields] = useState({
        oldPassword: "",
        newPassword: "",
        repassword: ""
    });
    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        repassword: ""
    });
    const [userInfo, setUserInfo] = useState({
        name: "",
        surname: "",
        email: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState(null);


    useEffect(() => {
        setAuthenticated(Cookies.get("authenticated") === "true" ? true : false);
    }, []);

    const ChangePassword = async () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
            body: JSON.stringify({
                old_password: inputFields.oldPassword,
                new_password: inputFields.newPassword
            })
        };
        const response = await fetch("http://localhost:3000/users/update/pwd", requestOptions);
        const data = await response.json();

        if (response.ok) {
            setFormMessage("Password changed successfully");
        }
        else {
            if (data.detail == "Invalid Token") {
                //set page message for sign in ("Please sign in again")
                SignOut();
                navigate("/SignIn");
            }
            if (data.detail == "Session Expired") {
                //set page message for sign in ("Session Expired, please sign in again")
                SignOut();
                navigate("/SignIn");
            }
            if (data.detail == "Old password is incorrect") {
                setFormMessage("Old password is incorrect")
            }
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
            ChangePassword();
        }
    }, [errors]);


    if (authenticated) {
        return (
            <>
                <NavBar />
                <h1 className="h1">Change Password</h1>
                {/* <hr className="hr" /> */}
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="password" name="oldPassword"
                                    className="input" value={inputFields.oldPassword} onChange={handleChange} />
                                <label className="label">Old Password</label>
                            </div>
                            <label className="error">{errors.oldPassword}</label>
                        </div>
                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="password" name="newPassword"
                                    className="input" value={inputFields.newPassword} onChange={handleChange} />
                                <label className="label">New Password</label>
                            </div>
                            <label className="error">{errors.newPassword}</label>
                        </div>
                        <div className="input-error-container">
                            <div className="input-label-container">
                                <input type="password" name="repassword"
                                    className="input" value={inputFields.repassword} onChange={handleChange} />
                                <label className="label">Repeat Password</label>
                            </div>
                            <label className="error">{errors.repassword}</label>
                        </div>
                        <br />
                        <div className="form-error-container">
                            <label className="form-error">{formMessage}</label>
                        </div>
                        <div className="button-container">
                            <input type="submit" className="button-5" value="Update Password" />
                        </div>
                    </form>

                </div >
            </>
        )
    }
    else {
        navigate("/SignIn");
    }


}