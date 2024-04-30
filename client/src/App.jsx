import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Register from "./views/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
