import NavBar from "../components/NavBar";
import React, { useEffect, useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BasicLineChart from "../components/LineChart";



export const validateValues = (inputValues) => {
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

export default function Model() {
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(null);
    const [inputFields, setInputFields] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
    });
    const [errors, setErrors] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
    });

    useEffect(() => {
        const loggedInUser = Cookies.get("authenticated");
        setauthenticated(loggedInUser);
        if (loggedInUser === "false") {
            navigate("/SignIn");
        }
    }, []);

    const [submitting, setSubmitting] = useState(false);

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
                    <select className="model-input" name="Product" id="prod" placeholder="Product">
                        <option value="Product">Select a product</option>
                        
                    </select>
                     <input type="month" placeholder="Prediction Month" name="input4" required min="2020-01" max="2025-12"className="model-input"/>
                     <input type="number" placeholder="Sold Units 1 Month Before" name="input3" min={0} required className="model-input"/>
                     <input type="number" placeholder="Sold Units 2 Months Before" name="input4" min={0} required className="model-input"/>
                     <input type="number" placeholder="Sold Units 3 Months Before" name="input4" min={0} required className="model-input"/>
                     <input type="number" placeholder="Visits POChP" name="input4" min={0} required className="model-input"/>
                     <input type="number" placeholder="Visits ASTMA" name="input4" min={0} required className="model-input"/>
                     <input type="number" placeholder="Sold Products Whole Period" name="input4" min={0} required className="model-input"/>
                 </div>
                 <br/><br/>
         <div className="button-container">
         <input type="submit" className="model-submit-button" />
         </div>
         </form>
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