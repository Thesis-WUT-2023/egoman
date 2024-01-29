import NavBar from "../components/NavBar";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../contexts/UserContext";
import BasicLineChart from "../components/LineChart";
import '../styles/Model.css';


export const validateModelValues = (inputValues) => {
    let errors = {};
    if (inputValues.astma < 0 || inputValues.pochp < 0) {
        errors.error = "All fields should be greater than 0";
    }

    return errors;
};

const validateSalesValues = (inputValues) => {
    let errors = {};

    if (new Date(inputValues.month1) >= new Date(inputValues.month2)) {
        errors.error = "First date should be before the Second date";
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

export default function Model() {
    const navigate = useNavigate();
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();


    const [authenticated, setAuthenticated] = useState(false);

    const [submittingModel, setSubmittingModel] = useState(false);
    const [submittingSales, setSubmittingSales] = useState(false);

    const [modelInputFields, setModelInputFields] = useState({
        month: 0,
        astma: 0,
        pochp: 0,
    });
    const [salesInputFields, setSalesInputFields] = useState({
        month1: 0,
        month2: 0,
    });
    const [modelErrors, setModelErrors] = useState({
        error: ""
    });
    const [salesErrors, setSalesErrors] = useState({
        error: ""
    });


    const [modelXValues, setModelXValues] = useState(['2023-05', '2023-06', '2023-07', '2023-08']);
    const [modelYValues, setModelYValues] = useState([0, 0, 0, 0]);

    const [salesXValues, setSalesXValues] = useState(['2023-05', '2023-06', '2023-07', '2023-08']);
    const [salesYValues, setSalesYValues] = useState([0, 0, 0, 0]);



    useEffect(() => {
        setAuthenticated(Cookies.get("authenticated") === "true" ? true : false);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setModelInputFields({ ...modelInputFields, [name]: value });
        setSalesInputFields({ ...salesInputFields, [name]: value });
    };



    const handleSubmitModel = async (event) => {
        event.preventDefault();
        setModelErrors(validateModelValues(modelInputFields));
        setupModelValues();
        setSubmittingModel(true);
        if (Object.keys(modelErrors).length === 0) {
            RequestResult();
        }
    };
    const handleSubmitSales = async (event) => {
        event.preventDefault();
        setSalesErrors(validateSalesValues(salesInputFields));
        setupSalesValues();
        if (Object.keys(salesErrors).length === 0) {
            GetSales();
        }
    };


    const setupModelValues = () => {
        modelInputFields.month = ref1.current.value;
        modelInputFields.pochp = parseInt(ref2.current.value);
        modelInputFields.astma = parseInt(ref3.current.value);
    }
    const setupSalesValues = () => {
        salesInputFields.month1 = ref4.current.value;
        salesInputFields.month2 = ref5.current.value;
    }


    const RequestResult = async () => {
        console.log(modelInputFields.month);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
            body: JSON.stringify({
                "prediction_month": modelInputFields.month + "-01",
                "visits_to_POChP": modelInputFields.pochp,
                "visits_to_Astma": modelInputFields.astma
            })
        };
        const response = await fetch("http://localhost:3000/model/", requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            let arr1 = [];
            let arr2 = [];
            for (const sale of data.sales) {
                arr1.push((sale.date).substring(0, 7));
                arr2.push(sale.value);
            }
            setModelXValues(arr1);
            setModelYValues(arr2);

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
        }
    }
    const GetSales = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
            body: JSON.stringify({
                "start_date": salesInputFields.month1 + "-01",
                "end_date": salesInputFields.month2 + "-01"
            })
        };

        const response = await fetch("http://localhost:3000/sales/", requestOptions);
        const data = await response.json();

        if (response.ok) {
            let arr1 = [];
            let arr2 = [];
            for (let i = 0; i < data.length; i++) {
                arr1.push((data[i].date).substring(0, 7));
                arr2.push(data[i].value);

            }
            console.log(arr1);

            setSalesXValues(arr1);
            setSalesYValues(arr2);

        }
        else {
            if (data.detail == "Invalid Token") {
                console.log("wtf");

                //set page message for sign in ("Please sign in again")
                SignOut();
                navigate("/SignIn");
            }
            if (data.detail == "Session Expired") {
                //set page message for sign in ("Session Expired, please sign in again")
                SignOut();
                navigate("/SignIn");
            }
        }
    }

    if (authenticated) {
        return (
            <>
                <NavBar />
                <div className="model-body">
                    <div className="grid1">
                        <h1 className="h1">Predict</h1>
                        <BasicLineChart X={modelXValues} Y={modelYValues} height={400} />
                        <form onSubmit={handleSubmitModel}>
                            <div className="model-input-container">
                                <br /><br />
                                {/* <select className="model-select" name="Product" id="prod" placeholder="Product">
                                    <option value="Product">Select a product</option>
                                </select> */}
                                <input type="month" placeholder="Month" name="input1" required className="model-input-month" onChange={handleChange} min="2023-01" max="2024-03" ref={ref1} />
                                <input type="number" placeholder="Visits POChP" name="input2" required className="model-input" onChange={handleChange} min={0} max={40} ref={ref2} />
                                <input type="number" placeholder="Visits ASTMA" name="input3" required className="model-input" onChange={handleChange} min={0} max={40} ref={ref3} />
                            </div>
                            <br /><br />
                            <div className="button-container">
                                <input type="submit" className="model-submit-button" />
                            </div>
                        </form>
                        <label className="error">{modelErrors.error}</label>
                    </div>

                    <div className="grid2">
                        <h1 className="h1">Get Sales</h1>
                        <BasicLineChart X={salesXValues} Y={salesYValues} height={400} />

                        <form onSubmit={handleSubmitSales}>
                            <div className="model-input-container2">
                                <br /><br />
                                {/* <select className="model-select" name="Product" id="prod" placeholder="Product">
                                    <option value="Product">Select a product</option>
                                </select> */}
                                <input type="month" placeholder="Month" name="input4" required className="model-input-month" min="2023-01" max="2024-01" ref={ref4} />
                                <input type="month" placeholder="Month" name="input5" required className="model-input-month" min="2023-01" max="2024-01" ref={ref5} />
                            </div>
                            <label className="error-model">{salesErrors.error}</label>
                            <br /><br />
                            <div className="button-container">
                                <input type="submit" className="model-submit-button" />
                            </div>
                        </form>

                    </div>
                </div>
            </>
        )
    }
    else {
        navigate("/SignIn");
    }

}
