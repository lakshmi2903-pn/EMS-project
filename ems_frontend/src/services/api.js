import axios from "axios";

const API = axios.create({
  // This version handles BOTH your live site and your local computer correctly
  baseURL: import.meta.env.VITE_API_URL || 
           (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:8000/api/" 
            : "https://pythonanywhere.com"),
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
