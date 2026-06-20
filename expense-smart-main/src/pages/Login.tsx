import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/authApi";

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("⚠️ Please enter email and password");
      return;
    }

    try {
      const res = await loginUser({
        email,
        password,
      });

      console.log("Login response:", res.data);

      // ✅ Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("✅ Login successful");

      // ✅ Update app state
      onLogin(res.data);

      // ✅ Redirect to home/dashboard
      navigate("/");

    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response?.status === 404) {
        alert("❌ API not found (check backend URL)");
      } else if (err.response?.status === 401) {
        alert("❌ Invalid email or password");
      } else if (err.response?.data) {
        alert(err.response.data);
      } else {
        alert("❌ Login failed");
      }
    }
  };

  /* -------- OPTIONAL -------- */
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ width: "300px" }}>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
          onClick={handleLogin}
        >
          Login
        </button>

        

        {/* 👉 Register link */}
        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}