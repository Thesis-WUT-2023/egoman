import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    // const [name, setName] = useState(null);
    // const [surname, setSurname] = useState(null);
    // const [email, setEmail] = useState(null);
    const [token, setToken] = useState("");


    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    );
};


/*name: [name, setName], surname: [surname, setSurname], email: [email, setEmail], */