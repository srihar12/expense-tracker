import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/authApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const res = await registerUser({
        name,
        email,
        password,
      });

      console.log("Register response:", res.data);

      alert("✅ Registered successfully");

      // redirect to login page
      navigate("/login");

    } catch (err: any) {
      console.error("Register error:", err);

      // ✅ show backend error if exists
      if (err.response?.data) {
        alert(err.response.data);
      } else if (err.response?.status === 404) {
        alert("❌ API not found (check backend URL)");
      } else {
        alert("❌ Registration failed");
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ width: "300px" }}>

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
          onClick={handleRegister}
        >
          Register
        </button>

        {/* 👉 Go to Login */}
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}