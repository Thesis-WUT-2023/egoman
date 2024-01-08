import NavBar from "../components/NavBar";
import React, { useEffect, useState, Component, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BasicLineChart from "../components/LineChart";
import '../styles/Model.css';


export const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.month1 < 0 || inputValues.month2 < 0 || inputValues.month3 < 0 ||
        inputValues.astma < 0 || inputValues.pochp < 0 || inputValues.sold < 0) {
        errors.nums = "All fields should be greater than 0";
    }

    return errors;
};

export default function Model() {
    const navigate = useNavigate();
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();
    const ref6 = useRef();
    const ref7 = useRef();
    // const ref8 = useRef();
    const [authenticated, setauthenticated] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [inputFields, setInputFields] = useState({
        product: "",
        month: 0,
        month1: 0,
        month2: 0,
        month3: 0,
        astma: 0,
        pochp: 0,
        sold: 0,
    });
    const [errors, setErrors] = useState({
        product: "",
        month: "",
        nums: "",
    });
    const [xValues, setXValues] = useState([1, 2, 3, 4]);
    const [yValues, setYValues] = useState([40, 80, 60, 35]);


    useEffect(() => {
        setauthenticated(Cookies.get("authenticated") === "true" ? true : false);
    }, []);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setupValues();
        setSubmitting(true);
    };

    const setupValues = () => {
        let value1 = ref1.current.value.split("-");
        let month4 = parseInt(value1[1]);

        let month3 = month4 - 1;
        if (month3 <= 0) {
            month3 = 12 + month3;
        }

        let month2 = month4 - 2;
        if (month2 <= 0) {
            month2 = 12 + month2;
        }

        let month1 = month4 - 3;
        if (month1 <= 0) {
            month1 = 12 + month1;
        }
        
        let value2 = ref2.current.value;
        let value3 = ref3.current.value;
        let value4 = ref4.current.value;
        let value5 = ref5.current.value;
        let value6 = ref6.current.value;
        let value7 = ref7.current.value;

        setXValues([month1.toString(), month2.toString(), month3.toString(), month4.toString()]);

        inputFields.month = month4;
        inputFields.month1 = parseInt(value2);
        inputFields.month2 = parseInt(value3);
        inputFields.month3 = parseInt(value4);
        inputFields.pochp = parseInt(value5);
        inputFields.astma = parseInt(value6);
        inputFields.sold = parseInt(value7);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            RequestResult();
        }
    }, [errors]);

    const RequestResult = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + Cookies.get("token").toString() },
            body: JSON.stringify({
                "prediction_month": inputFields.month,
                "value_of_month_A": inputFields.month1,
                "value_of_month_B": inputFields.month2,
                "value_of_month_C": inputFields.month3,
                "visits_to_POChP": inputFields.pochp,
                "visits_to_Astma": inputFields.astma,
                "value_of_all_period": inputFields.sold
            })
        };
        const response = await fetch("http://localhost:3000/model/", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            
        }
        else {
            setYValues([inputFields.month3 , inputFields.month2, inputFields.month1, data.predicted_value]);
        }
    }


    if (authenticated) {
        return (
            <>
                <NavBar />

                <h1 className="h1">Model</h1>
                <BasicLineChart X={xValues} Y={yValues} height={300}/>
                <form onSubmit={handleSubmit}>
                    <div className="model-input-container">
                        <br /><br />
                        <select className="model-select" name="Product" id="prod" placeholder="Product">
                            <option value="Product">Select a product</option>
                        </select>
                        <input type="month" placeholder="Month" name="input4" required className="model-input-month" onChange={handleChange} min="2020-01" max="2025-12" ref={ref1}/>
                        <input type="number" placeholder="Sold Units 1 Month Before" name="input3" required className="model-input" onChange={handleChange} min={0} ref={ref2}/>
                        <input type="number" placeholder="Sold Units 2 Months Before" name="input4" required className="model-input" onChange={handleChange} min={0} ref={ref3}/>
                        <input type="number" placeholder="Sold Units 3 Months Before" name="input4" required className="model-input" onChange={handleChange} min={0} ref={ref4}/>
                        <input type="number" placeholder="Visits POChP" name="input4" required className="model-input" onChange={handleChange} min={0} ref={ref5}/>
                        <input type="number" placeholder="Visits ASTMA" name="input4" required className="model-input" onChange={handleChange} min={0} ref={ref6}/>
                        <input type="number" placeholder="Sold Products Whole Period" name="input4" required className="model-input" onChange={handleChange} min={0} ref={ref7}/>
                    </div>
                    <br /><br />
                    <div className="button-container">
                        <input type="submit" className="model-submit-button" />
                    </div>
                </form>
            </>
        )
    }
    else {
        // navigate("/SignIn");
    }

}
