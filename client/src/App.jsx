import { Routes, Route } from "react-router-dom";
import LoginRegister from "./views/LoginRegister";
import { UserProvider } from "./context/UserContext";
import PublicRoute from "./components/PublicRoute";
import LandingPage from "./views/LandingPage";
import Profile from "./components/Profile";
import WishlistView from "./views/WishlistView";
import Resultados from "./views/Resultados";
import PrivateRoute from "./components/PrivateRoute";
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
        <Route path="/busqueda/:search" element={<Resultados />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/wishlist" element={
          <PrivateRoute>
            <WishlistView />
          </PrivateRoute>
        } />
      </Routes>
    </UserProvider>
  );
}

export default App;
