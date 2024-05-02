import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const UserForm = ({ formType }) => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Este correo no es válido")
      .required("Esto es requerido"),
    password: Yup.string()
      .min(8, "Campo debe tener 8 caracteres")
      .required("NO OLVIDAR!!!"),
    ...(formType === "register" && {
      firstName: Yup.string().required("Nombre es requerido"),
      lastName: Yup.string().required("Apellido es requerido"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
        .required("Confirmar contraseña es requerido"),
    }),
  });
  const registerUser = async (values, setErrors) => {
    try {
      await axios.post("http://localhost:8000/api/auth/register", values, {
        withCredentials: true,
      });
      loginUser(values, setErrors);
    } catch (err) {
      console.log("Error: ", err);
      setErrors({ general: err });
    }
  };

  const loginUser = async (values, setErrors) => {
    try {
      let res = await axios.post(
        "http://localhost:8000/api/auth/login",
        values,
        { withCredentials: true }
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.log("Error: ", err);
      setErrors({ general: err });
    }
  };
  const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
    if (formType === "register") {
      registerUser(values, setErrors);
    } else {
      loginUser(values, setErrors);
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          ...(formType === "register" && {
            firstName: "",
            lastName: "",
            confirmPassword: "",
          }),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting }) => (
          <Form className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <h2>{formType === "login" ? "Iniciar Sesion" : "Registrarse"}</h2>
            <hr className="mb-2" />
            {errors?.general && (
              <div
                className="mt-2 text-sm text-red-600 dark:text-red-500"
                role="alert"
              >
                {errors.general}
              </div>
            )}

            {formType === "register" && (
              <>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Apellido"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              <Field
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-3">
              <Field
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            {formType === "register" && (
              <div className="mb-3">
                <Field
                  type="password"
                  name="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirmar password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-2 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Enviar!
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
