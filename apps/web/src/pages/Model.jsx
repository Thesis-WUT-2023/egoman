import NavBar from "../components/NavBar";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BasicLineChart from "../components/LineChart";
import '../styles/Model.css';
import Unauthorized from "../components/Unauthorized";


export const validateModelValues = (inputValues) => {
    let errors = null;
    if (inputValues.astma < 0 || inputValues.pochp < 0) {
        errors = "All fields should be greater than 0";
    }

    return errors;
};

const validateSalesValues = (inputValues) => {
    let errors = null;
    if (new Date(inputValues.month1) >= new Date(inputValues.month2)) {
        errors = "First date should be before the Second date";
    }
    return errors;
};

const SignOut = () => {
    Cookies.set("authenticated", false);
    Cookies.set("token", "");
}

export default function Model() {
    const navigate = useNavigate();

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();


    const [modelInputFields, setModelInputFields] = useState({
        month: "",
        astma: 0,
        pochp: 0,
    });
    const [salesInputFields, setSalesInputFields] = useState({
        month1: 0,
        month2: 0,
    });
    const [modelErrors, setModelErrors] = useState("");
    const [salesErrors, setSalesErrors] = useState("");

    //'2023-05', '2023-06', '2023-07', '2023-08'
    const [modelXValues, setModelXValues] = useState(['2023-05', '2023-06', '2023-07', '2023-08']);
    const [modelYValues, setModelYValues] = useState([1, 2, 3, 4]);
    const [salesXValues, setSalesXValues] = useState(['2023-05', '2023-06', '2023-07', '2023-08']);
    const [salesYValues, setSalesYValues] = useState([1, 2, 3, 4]);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setModelInputFields({ ...modelInputFields, [name]: value });
        setSalesInputFields({ ...salesInputFields, [name]: value });
    };



    const handleSubmitModel = async (event) => {
        event.preventDefault();
        setModelErrors(validateModelValues(modelInputFields));
        setupModelValues();
        if (modelErrors === null) {
            RequestResult();
        }
    };
    const handleSubmitSales = async (event) => {
        event.preventDefault();
        setupSalesValues();
        setSalesErrors(validateSalesValues(salesInputFields));
        if (salesErrors === null) {
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
            console.log(data);

            setSalesXValues(arr1);
            setSalesYValues(arr2);
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
    if (Cookies.get("authenticated") == "true") {
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
                                <div className="input-wrapper">
                                    <input type="month" placeholder="Month" name="input1" required className="input11" onChange={handleChange} min="2023-01" max="2024-03" ref={ref1} />
                                    <label className="label11">Month</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="number" placeholder="0" name="input2" required className="input11" onChange={handleChange} min={0} max={40} ref={ref2} />
                                    <label className="label11">Visits POChP</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="number" placeholder="0" name="input3" required className="input11" onChange={handleChange} min={0} max={40} ref={ref3} />
                                    <label className="label11">Visits ASTMA</label>
                                </div>
                            </div>
                            <label className="error11">{modelErrors}</label>
                            <br /><br />
                            <div className="button-container">
                                <input type="submit" className="model-submit-button" />
                            </div>
                        </form>

                    </div>
                    <div className="grid2">
                        <h1 className="h1">Get Sales</h1>
                        <BasicLineChart X={salesXValues} Y={salesYValues} height={400} />

                        <form onSubmit={handleSubmitSales} >
                            <div className="model-input-container">
                                <br /><br />
                                {/* <select className="model-select" name="Product" id="prod" placeholder="Product">
                                    <option value="Product">Select a product</option>
                                </select> */}
                                <div className="input-wrapper">
                                    <input type="month" placeholder="Month" name="input4" required className="input11" min="2023-01" max="2024-01" ref={ref4} />
                                    <label className="label11">From:</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="month" placeholder="Month" name="input5" required className="input11" min="2023-01" max="2024-01" ref={ref5} />
                                    <label className="label11">To:</label>
                                </div>
                            </div>
                            <label className="error11">{salesErrors}</label>
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
        return (<Unauthorized />);
    }

}
