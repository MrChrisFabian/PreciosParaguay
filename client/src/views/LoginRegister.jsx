import React, { useState } from "react";
import UserForm from "../components/UserForm";

const LoginRegister = () => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
    <div className="flex flex-col items-center min-h-screen">
      <div className="mx-auto max-w-lg overflow-y-auto">
        <div className="space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          {!showRegister ? (
            <>
              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Bienvenido de Vuelta!
              </h1>
              <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Bienvenido de vuelta. Ingresa tus datos para continuar.
              </p>
              <UserForm formType="login" />
              <p className="text-center text-sm text-gray-500">
                No tienes cuenta?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  Registrate
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Regístrate
              </h1>
              <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Completa el formulario para crear tu cuenta.
              </p>
              <UserForm formType="register" />
              <p className="text-center text-sm text-gray-500">
                Ya tienes cuenta?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  Iniciar Sesion
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div></div>
  );
};

export default LoginRegister;
