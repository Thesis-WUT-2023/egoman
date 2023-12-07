
import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Styles/Styles.css";
import Model from './pages/Model'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import NoPage from './pages/NoPage';


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Model />} />
      <Route path="/Model" element={<Model />} />
      <Route path="/Account" element={<Account />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path='/*' element={<NoPage />} />
    </Routes>
  )
}
