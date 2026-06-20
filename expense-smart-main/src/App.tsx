import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";

function App() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const handleLogin = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* HOME */}
        <Route
          path="/"
          element={
            user ? (
              <>
                <button onClick={handleLogout}>Logout</button>
                <Index />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;