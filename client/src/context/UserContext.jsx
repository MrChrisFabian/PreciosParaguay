import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) {
      setUser(userDetails);
    }
  }, []);

  const setUserKeyValue = (clave, valor) => {
    setUser((prevUser) => ({ ...prevUser, [clave]: valor }));
    localStorage.setItem("user", JSON.stringify({ ...user, [clave]: valor }));
  };

  const getUserId = () => {
    return user ? user._id : null; // Suponiendo que el ID del usuario está en la propiedad _id
  };

  const contextValue = {
    user,
    setUser: (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    },
    setUserKeyValue,
    getUserId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
