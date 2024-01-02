import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState({
        Name: "",
        Surname: "",
        email: "",
        token: "",
    });


    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};
