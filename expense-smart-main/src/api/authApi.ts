import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/auth",
});

export const loginUser = (data: any) =>
  API.post("/login", data);

export const registerUser = (data: any) =>
  API.post("/register", data);