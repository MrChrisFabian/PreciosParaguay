import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.svg"; 

const Component = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logOutUser = async () => {
    console.log("Cerrando sesión");
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      });
      console.log("borrando");
      localStorage.removeItem("user");
      setUser(null); // Actualiza el estado del usuario en el contexto
      navigate("/login");
      console.log("User logged out");
    } catch (err) {
      console.log("Error: ", err.response?.data?.msg || "Error desconocido");
      alert("Error al cerrar sesión");
    }
  };

  return (
    <Navbar rounded >
      <Navbar.Brand href="">
        <img src={Logo} className="mr-3 h-12 sm:h-16" alt="Logo" />
      </Navbar.Brand>
      <ul className="flex justify-center gap-6 items-center">
        <Navbar.Link href="#" className="">
          Home
        </Navbar.Link>
        <Navbar.Link href="#" className="">
          About
        </Navbar.Link>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img="" rounded className="mr-2" />}
        >
          {user ? (
            <>
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={logOutUser}>Logout</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Header>
                <span className="block text-sm">Guest User</span>
              </Dropdown.Header>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
            </>
          )}
        </Dropdown>
      </ul>
    </Navbar>
  );
};

export default Component;
