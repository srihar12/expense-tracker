import axios from "axios";

// Render Backend URL
const API = "https://expense-tracker-m277.onrender.com";

// 👉 Add expense
export const createExpense = (expense: any) => {
  return axios.post(`${API}/expenses`, expense);
};

// 👉 Get expenses by email
export const getExpenses = (email: string) => {
  return axios.get(`${API}/expenses/${email}`);
};

// 👉 Delete expense
export const deleteExpense = (id: number) => {
  return axios.delete(`${API}/expenses/${id}`);
};