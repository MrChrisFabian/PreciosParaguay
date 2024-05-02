import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Profile = () => {
  const { user, setUser, } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    ...user,
    confirmPassword: "",
  });

  useEffect(() => {
    setEditedUser({ ...user, confirmPassword: "" }); // Resetear los datos editados cuando se cambia de usuario
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (editedUser.password !== editedUser.confirmPassword) {
        alert("La contraseña y la confirmación de contraseña no coinciden.");
        return;
      }

      const updatedUserData = {
        firstName: editedUser.firstName,
        lastName: editedUser.lastName,
        email: editedUser.email,
        password: editedUser.password,
      };

      const response = await axios.put(
        `http://localhost:8000/api/auth/${user._id}`,
        updatedUserData
      );
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 200) {
        setUser(response.data.user); // Actualiza el usuario completo con los datos del servidor
        setEditing(false);
      } else {
        console.error("Error actualizando usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">
        Perfil de Usuario
      </h1>
      {user && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Nombre:
            </label>
            {editing ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                name="firstName"
                value={editedUser.firstName}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-lg text-gray-800">{user.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Apellido:
            </label>
            {editing ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                name="lastName"
                value={editedUser.lastName}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-lg text-gray-800">{user.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo:
            </label>
            {editing ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-lg text-gray-800">{user.email}</p>
            )}
          </div>
          {editing && (
            <div className="mb-4">
              <label
                className="block text-gray-800 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={editedUser.password}
                onChange={handleInputChange}
              />
            </div>
          )}
          {editing && (
            <div className="mb-4">
              <label
                className="block text-gray-800 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirmar Contraseña:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={editedUser.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}
          {editing ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={handleSaveClick}
            >
              Guardar
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={handleEditClick}
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
