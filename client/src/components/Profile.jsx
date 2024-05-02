import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Avatar } from "flowbite-react"; // Importa el componente Avatar
import NavBarra from "./Navbar";
import MyFooter from "./Footer";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [imageurl, setImageurl] = useState(user.profile);
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

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/upload/${user._id}`, // Incluye el ID del usuario en la URL de subida
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta de subida de imagen:", response.data);
      setUser({ ...user, profile: response.data.imageUrl }); // Actualiza la URL de la imagen en el estado del usuario
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <>
      <NavBarra />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 text-center">
          Perfil de Usuario
        </h1>
        <div className="flex items-center content-center justify-center gap-44">
          {user && ( // Verifica que user y user.profile estén definidos
            <div className="flex flex-col items-center justify-center md:justify-start">
              <img src={user.profile} alt="User profile" className="rounded-full w-64 h-64 object-cover " />
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleUploadImage}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="bg-slate-500 my-12 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2 md:ml-0"
              >
                Importar Imagen
              </label>
            </div>
          )}
          {user && (
            <div className="bg-white rounded-lg shadow-xl py-4 pr-40 pl-4 flex flex-col ">
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
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="mb-4">

              </div>
              {editing ? (
                <button
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={handleSaveClick}
                >
                  Guardar
                </button>
              ) : (
                <button
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 w-32 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={handleEditClick}
                >
                  Editar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <MyFooter />
      </div>
    </>

  );
};

export default Profile;
