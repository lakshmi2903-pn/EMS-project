import React, { useState, useEffect } from "react";
import API from "../services/api";

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("profiles/") // Your Django ViewSet returns ALL profiles for Admins
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Admin access denied", err));
  }, []);

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="fw-bold mb-4">👥 Employee Directory</h4>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department || "N/A"}</td>
              <td><span className="badge bg-info">{emp.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDirectory;
