import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-m277.onrender.com/auth",
});

// Login
export const loginUser = (data: any) =>
  API.post("/login", data);

// Register
export const registerUser = (data: any) =>
  API.post("/register", data);