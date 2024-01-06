import NavBar from "../components/NavBar";
import { useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import '../styles/Account.css';
import DeleteConfirmation from "../components/DeleteConfirmation";



export const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.name.length < 1)
        errors.name = "Name can not be empty";
    if (inputValues.surname.length < 1)
        errors.surname = "Surname can not be empty";

    return errors;
};


export default function Account() {
    const navigate = useNavigate();
    const buttonLabel = useRef();
    const button = useRef();

    const [authenticated, setAuthenticated] = useState(null);
    const [inputFields, setInputFields] = useState({
        name: "",
        surname: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        surname: ""
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
    const [readOnly, setReadOnly] = useState(true);



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

        setInputFields(data);
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

    const UpdateAccount = async () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
            body: JSON.stringify({
                new_name: inputFields.name,
                new_surname: inputFields.surname
            })
        };
        const response = await fetch("http://localhost:3000/users/update/settings", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setFormMessage("Error");
        }
        else {
            setFormMessage("Name has been updated")
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



    const handleEditClick = () => {
        setReadOnly(false);
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
            UpdateAccount();
            setReadOnly(true);
        }
    }, [errors]);


    if (authenticated) {
        return (
            <>
                <div className={blur ? "blur" : null}>
                    <NavBar />
                    <h1 className="h1">User Profile</h1>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="input-error-container">
                                <div className="input-label-container">
                                    <input id="Account-Inputs" type="text" name="name" className="input" value={inputFields.name} onChange={handleChange} readOnly={readOnly} />
                                    <label className="label">Name</label>
                                </div>
                                <label className="error">{errors.name}</label>
                            </div>

                            <div className="input-error-container">
                                <div className="input-label-container">
                                    <input id="Account-Inputs" type="text" name="surname" className="input" value={inputFields.surname} onChange={handleChange} readOnly={readOnly} />
                                    <label className="label">Surname</label>
                                </div>
                                <label className="error">{errors.surname}</label>
                            </div>

                            <div className="input-error-container">
                                <div className="input-label-container">
                                    <input id="Account-Inputs" type="text" name="email" className="input" value={inputFields.email} onChange={handleChange} readOnly />
                                    <label className="label">Email</label>
                                </div>
                                <label className="error">{errors.email}</label>
                            </div>
                            <div className="form-error-container">
                                <label className="form-error">{formMessage}</label>
                            </div>
                            <div className="account-buttons-container">
                                <div className="toggle-buttons-container">
                                    <input type="button" className="edit-user-button" onClick={handleEditClick} value={"Edit Account"}/>                                  
                                    <input type="submit" className={readOnly ? "submit-user-button" : "submit-user-button z-index1"} value={"Submit"} />
                                </div>
                                <input type="button" className="delete-user-button" onClick={handleDeleteClick} value={"Delete Account"}/>
                            </div>
                        </form>
                    </div>
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