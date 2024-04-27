import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const initialUserState = userDetails ? userDetails : null;
    const [user, setUser] = useState(initialUserState);

    const setUserKeyValue = (clave, valor) => {
        setUser({ ...user, [clave]: valor });
    };

    const contextValue = {
        user,
        setUser,
        setUserKeyValue,
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };