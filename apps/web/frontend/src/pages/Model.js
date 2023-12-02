import NavBar from "../components/NavBar";
import React, { Component } from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import Cookies from "js-cookie";
import BasicLineChart from "../components/LineChart";
// import CanvasJSReact from '@canvasjs/react-charts';



export default function Model() {
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(null);
    const [inputFields, setInputFields] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
    });
    const [errors, setErrors] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
    });

    useEffect(() => {
        const loggedInUser = Cookies.get("authenticated");
        setauthenticated(loggedInUser);
        if (!loggedInUser) {
            navigate("/SignIn");
        }
    }, []);

    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        let errors = {};

        // if (!inputFields.email)
        //     errors.email = "Email is required";
        // else if (!validRegex.test(inputFields.email.toLowerCase())) {
        //     errors.email = "Invalid Email";
        // }
        // if (!inputFields.password)
        //     errors.password = "Password is required";

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
        RequestResult();
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);

    const RequestResult = async () => {
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
            
        }
        else {
            Cookies.set("token", data);
            Cookies.set("authenticated", true);
            navigate("/Model");
        }
    }
    return (
        <>
        <NavBar />
        
        <h1 className="h1">Model</h1>
        <BasicLineChart/>
        <form onSubmit={handleSubmit}>
                 <div className="model-input-container">
                     <br/><br/>
                     <input type="text" placeholder="Input 1" name="input1" required className="input"/>           
                     <input type="text" placeholder="Input 2" name="input4" required className="input"/>
                     <input type="text" placeholder="Input 3" name="input3" required className="input"/>
                     <input type="text" placeholder="Input 4" name="input4" required className="input"/>
                 </div>
                 <br/><br/>
         <div className="button-container">
         <input type="submit" className="model-submit-button" />
         </div>
0         </form>
        </>
    )  
    
    }


// var CanvasJSReact = require('@canvasjs/react-charts');


// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
// var dataPoints =[];
// export default class Model extends Component {
 
// 	render() {	
// 		const options = {
// 			theme: "Light2",
// 			title: {
// 				text: "Drug A"
// 			},
// 			data: [{
// 				type: "line",
// 				xValueFormatString: "MMM YYYY",
// 				yValueFormatString: "#,##0.00",
// 				dataPoints: dataPoints
// 			}]
// 		}
// 		return (
//             <>
//                 <NavBar/>
// 		<div>
// 			<CanvasJSChart options = {options} 
// 				onRef={ref => this.chart = ref}
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
//         <form>
//                 <div className="model-input-container">
//                     <br/><br/>
//                     <input type="text" placeholder="Input 1" name="input1" required className="input"/>           
//                     <input type="text" placeholder="Input 2" name="input4" required className="input"/>
//                     <input type="text" placeholder="Input 3" name="input3" required className="input"/>
//                     <input type="text" placeholder="Input 4" name="input4" required className="input"/>
//                 </div>
//                 <br/><br/>
//         <div className="button-container">
//         <input type="submit" className="model-submit-button" />
//         </div>
//         </form>
//         </>);
// 	}
	
// 	componentDidMount(){
// 		var chart = this.chart;
// 		fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
// 		.then(function(response) {
// 			return response.json();
// 		})
// 		.then(function(data) {
// 			for (var i = 0; i < data.length; i++) {
// 				dataPoints.push({
// 					x: new Date(data[i].x),
// 					y: data[i].y
// 				});
// 			}
// 			chart.render();
// 		});
// 	}
// }
// module.exports = Model; 
// export default Model;