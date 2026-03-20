import axios from "axios";

const API = axios.create({
  // This uses your LIVE backend on PythonAnywhere
  baseURL: import.meta.env.VITE_API_URL || "https://pythonanywhere.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
