import { Routes, Route } from "react-router-dom";
import LoginRegister from "./views/LoginRegister";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LandingPage from "./views/LandingPage";
import ProductsP from "./components/Products";
import Resultados from "./views/Resultados";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginRegister />
            </PublicRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsP />} />
        <Route path="/busqueda/:search" element={<Resultados />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
