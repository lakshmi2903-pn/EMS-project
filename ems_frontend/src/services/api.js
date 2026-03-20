import axios from "axios";

const API = axios.create({
  
  baseURL: import.meta.env.VITE_API_URL || "https://pythonanywhere.com",
 
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    // This attaches the "Key" to the request header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;
