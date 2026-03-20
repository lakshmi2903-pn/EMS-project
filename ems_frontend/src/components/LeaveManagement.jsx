import React, { useState, useEffect } from "react";
import API from "../services/api";

function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [profile, setProfile] = useState({}); // To store name and ID
  const [formData, setFormData] = useState({ start_date: "", end_date: "", reason: "" });

  useEffect(() => {
    fetchLeaves();
    // 2. FETCH PROFILE INFO TO SHOW NAME/ID
    API.get("profiles/me/").then(res => setProfile(res.data));
  }, []);

  const fetchLeaves = async () => {
    const res = await API.get("leave/");
    setLeaves(res.data);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    await API.post("leave/", formData);
    alert("Leave Application Sent!");
    fetchLeaves();
  };

  return (
    <div className="card shadow border-0 p-4 rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">✈️ My Leaves</h3>
        {/* DISPLAY NAME AND ID HERE */}
        <div className="text-end">
            <h6 className="mb-0 fw-bold">{profile.first_name} {profile.last_name}</h6>
            <small className="text-muted">Emp ID: {profile.username}</small>
        </div>
      </div>

      <form onSubmit={handleApply} className="bg-light p-4 rounded mb-4 border">
        <h6 className="mb-3 text-secondary">Apply for Leave</h6>
        <div className="row g-2">
          <div className="col-md-4">
            <input type="date" className="form-control" onChange={(e) => setFormData({...formData, start_date: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input type="date" className="form-control" onChange={(e) => setFormData({...formData, end_date: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100 fw-bold">Submit Request</button>
          </div>
        </div>
        <textarea className="form-control mt-3" rows="3" placeholder="Reason for leave" 
          onChange={(e) => setFormData({...formData, reason: e.target.value})} required></textarea>
      </form>

      <table className="table table-hover mt-3">
        <thead className="table-dark">
          <tr><th>Dates</th><th className="text-center">Status</th></tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l.id}>
              <td>{l.start_date} to {l.end_date}</td>
              <td className="text-center">
                <span className={`badge ${l.status === 'Approved' ? 'bg-success' : l.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                    {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveManagement;
