import React, { useState } from "react";
import API from "../services/api";

function Login({ setAuth, setRole }) {
  const [username, setUsernameInput] = useState("");
  const [password, setPasswordInput] = useState("");
  
  // 1. ADD THIS STATE for the dropdown selection
  const [selectedRole, setSelectedRoleInput] = useState("employee"); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("token/", {
        username: username,
        password: password,
        // Optional: you can send selectedRole to backend if your API requires it
      });

      const token = response.data.access;
      localStorage.setItem("access_token", token);

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      // 2. LOGIC CHOICE: 
      // You can either use the role from the TOKEN (more secure)
      // Or use the 'selectedRole' from the dropdown.
      const realRole = payload.role || selectedRole; 

      setRole(realRole);
      setAuth(true);
    } catch (error) {
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 border-0" style={{ width: "350px" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">EMS Login</h2>
        
        <form onSubmit={handleLogin}>
          
          {/* --- PASTE THE DROPDOWN CODE HERE (Inside the form) --- */}
          <div className="mb-3">
            <label className="form-label text-muted small">Login As:</label>
            <select 
              className="form-select" 
              value={selectedRole} 
              onChange={(e) => setSelectedRoleInput(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* ------------------------------------------------------ */}

          <div className="mb-3">
            <label className="form-label text-muted small">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted small">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
