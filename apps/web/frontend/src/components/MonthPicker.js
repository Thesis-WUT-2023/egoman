import React, { useState, useRef, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MonthPicker () {
    // const renderMonthContent = (month, shortMonth, longMonth) => {
    //   const tooltipText = `Tooltip for month: ${longMonth}`;
    //   return <span title={tooltipText}>{shortMonth}</span>;
    // };
    // const CustomInput = forwardRef(({ value, onClick }, ref) => (
    //     <input className="model-input" onClick={onClick} ref={ref}>
    //       {value}
    //     </input>
    //   ));
    // return (
    //   <DatePicker
    //     selected={new Date()}
    //     renderMonthContent={renderMonthContent}
    //     // showMonthYearPicker
    //     dateFormat="MM/yyyy"
    //     customInput={<CustomInput/>}
    //   />
    // );
    const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input className="model-input" onClick={onClick} ref={ref}>
      {value}
    </input>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
  };