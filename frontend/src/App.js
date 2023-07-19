import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Dashboard from "./features/dashboard/Dashboard";
import Products from "./features/products/Products";
import Login from "./features/login/login";

function App() {
  return (
    <Router>
      <WrapperComponents />
    </Router>
  );
}

function WrapperComponents() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate, isLoggedIn]);

  const handleLogin = (token) => {
    // Check if the token is valid
    if (token) {
      // Set the token in local storage
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } else {
      // Token is invalid or null
      // Show an error message or redirect to the login page
      console.log("Invalid token");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
