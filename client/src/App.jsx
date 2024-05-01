import { Routes, Route } from "react-router-dom";
import LoginRegister from "./views/LoginRegister";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <UserProvider>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {" "}
        <Navbar />
        <div className="flex-grow">
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
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
