import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiUserLine, RiLogoutBoxRLine } from "react-icons/ri"; // Importa los iconos que necesitas
import Logo from "../images/Logo.svg";

const NavBarra = () => {
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
    <Navbar className="rounded-b-lg mx-8 bg-slate-400 shadow-xl">
      <Navbar.Brand href="/">
        <img src={Logo} className="mr-3 h-12 sm:h-16" alt="Logo" />
      </Navbar.Brand>
      <ul className="flex justify-center gap-6 items-center">
        <Navbar.Link href="#" className="">
          About
        </Navbar.Link>
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                img={user.profile}
                alt="User settings"
                rounded
                className="mr-2"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user.firstName} {user.lastName}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href="/WishList">
              <RiUserLine className="inline-block mr-2" /> WishList
            </Dropdown.Item>
            <Dropdown.Item onClick={logOutUser}>
              <RiLogoutBoxRLine className="inline-block mr-2" /> Logout
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="Default Avatar"
                rounded
                className="mr-2"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Guest User</span>
            </Dropdown.Header>
            <Dropdown.Item href="/login">
              <RiUserLine className="inline-block mr-2" /> Login
            </Dropdown.Item>
          </Dropdown>
        )}
      </ul>
    </Navbar>
  );
};

export default NavBarra;
