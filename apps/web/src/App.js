
import React from 'react';
import { Routes, Route } from "react-router-dom";
import "./styles/Styles.css";
import Model from './pages/Model'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import NoPage from './pages/NoPage';
import { UserContextProvider } from './contexts/UserContext';
import Password from './pages/Password';


export default function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Model />} />
        <Route path="/Model" element={<Model />} />
        <Route path="/Account" element={<Account />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Password" element={<Password />} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </UserContextProvider>
  )
}
