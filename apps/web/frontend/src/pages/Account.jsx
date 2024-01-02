import NavBar from "../components/NavBar";
import { useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import '../Styles/Account.css';
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


export default function Account() {
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
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [blur, setBlur] = useState(false);



    useEffect(() => {
        setAuthenticated(Cookies.get("authenticated") === "true" ? true : false);
    }, []);
    useEffect(() => {
        GetCurrentUser();
    }, []);


    const GetCurrentUser = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
        };
        const response = await fetch("http://localhost:3000/users/current", requestOptions);
        const data = await response.json();

        setUserInfo(data);
    }
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

        if (!response.ok) {
            setFormMessage("Password incorrect");
        }
        else {
            setFormMessage("Password changed successfully");
        }
    }

    const DeleteAccount = async () => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
        };
        const response = await fetch("http://localhost:3000/users/current", requestOptions);
        const data = await response.json();

        if (response.ok) {
            Cookies.set("authenticated", false);
            Cookies.set("token", "");
            Cookies.set("email", false);
            Cookies.set("name", "");
            Cookies.set("surname", "");

            navigate("/SignIn");
        }
    }


    const handleDeleteClick = () => {
        setShowConfirmation(true);
        setBlur(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setBlur(false);
    };

    const handleConfirm = () => {
        DeleteAccount();
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
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            ChangePassword();
        }
    }, [errors]);


    if (authenticated) {
        return (
            <>
                <div className={blur ? "blur": null}>
                    <NavBar />
                    <h1 className="h1">User Account</h1>
                    <div className="account-container">
                        <div className="user-info">
                            <table className="user-info-table">
                                <tr>
                                    <td><label className="user-info-label">Name:</label></td>
                                    <td><label className="user-info-label">{userInfo.name}</label></td>
                                </tr>
                                <tr>
                                    <td><label className="user-info-label">Surname:</label></td>
                                    <td><label className="user-info-label">{userInfo.surname}</label></td>
                                </tr>
                                <tr>
                                    <td><label className="user-info-label">Email:</label></td>
                                    <td><label className="user-info-label">{userInfo.email}</label></td>
                                </tr>

                            </table>
                            <button class="delete-user-button" onClick={handleDeleteClick}>
                                <span class="text">Delete Account</span>
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                                    </svg>
                                </span>
                            </button>
                        </div>


                        <div className="pwd-info">
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

                    </div >

                </div>
                <div>
                    {
                        showConfirmation && (<DeleteConfirmation onCancel={handleCancel} onConfirm={handleConfirm} />)
                    }
                </div>
            </>
        )
    }
    else {
        navigate("/SignIn");
    }
}

/*<div className="form">
<form onSubmit={handleSubmit}>
                        <div className="form-error-container">
                            <label className="form-error">{formError}</label>
                        </div>
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
                        <div className="button-container">
                            <input type="submit" className="button-5" value="Update Information" />
                        </div>
                    </form>
                     </div>*/