import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children, redirectPath = "/login" }) => {
  const { user } = useContext(UserContext);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simula un retraso antes de verificar el usuario
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 1000); // Ajusta el tiempo de espera según sea necesario

    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return <div>Cargando...</div>; // O cualquier otro indicador de carga
  }

  return user ? children : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;