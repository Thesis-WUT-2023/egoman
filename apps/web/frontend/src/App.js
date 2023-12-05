
import React, {useState, useEffect, Component} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Model from './pages/Model'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import NoPage from './pages/NoPage';
import Cookies from 'js-cookie';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Model />} />
        <Route exact path="/Model" element={<Model />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path='Account' element={<Account />} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
