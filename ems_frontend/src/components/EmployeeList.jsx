import React, { useState, useEffect } from "react";
import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // This hits the main list view in your Django EmployeeProfileViewSet
    // Because the user is an Admin, Django returns ALL profiles
    API.get("profiles/") 
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Admin Access Denied", err));
  }, []);

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h4 className="fw-bold mb-4">👥 All Employee Profiles (Admin Only)</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td><span className="badge bg-success">{emp.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
