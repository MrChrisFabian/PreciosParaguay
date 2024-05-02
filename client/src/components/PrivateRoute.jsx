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
    }, 100); // Ajusta el tiempo de espera según sea necesario

    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return <div>Cargando...</div>; // O cualquier otro indicador de carga
  }

  return user ? children : <Navigate to={redirectPath} replace />;
};

<<<<<<< HEAD
export default PrivateRoute;
=======
export default PrivateRoute;
>>>>>>> 68f2bac48ef29361c20d495b7f61617ad2f14a40
