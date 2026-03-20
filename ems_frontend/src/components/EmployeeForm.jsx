import React, { useState, useEffect } from "react";
import API from "../services/api";

function EmployeeForm() {
  const [formData, setFormData] = useState({
    first_name: "", last_name: "", email: "", 
    phone: "", address: "", department: "", designation: ""
  });

  // Load existing details immediately on login
  useEffect(() => {
    API.get("profiles/me/")
      .then((res) => setFormData(res.data))
      .catch((err) => console.log("No profile found yet."));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("profiles/me/", formData);
      alert("Details Updated Successfully!");
    } catch (err) {
      alert("Error saving details. Make sure you are logged in.");
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 mt-3">
      <h4 className="text-secondary mb-4 border-bottom pb-2">📍 Personal Details</h4>
      <form onSubmit={handleUpdate}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="small text-muted">First Name</label>
            <input type="text" className="form-control bg-light" value={formData.first_name || ""} 
              onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="small text-muted">Last Name</label>
            <input type="text" className="form-control bg-light" value={formData.last_name || ""} 
              onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="small text-muted">Email Address</label>
            <input type="email" className="form-control bg-light" value={formData.email || ""} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="small text-muted">Phone Number</label>
            <input type="text" className="form-control bg-light" value={formData.phone || ""} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="col-12">
            <label className="small text-muted">Current Address</label>
            <textarea className="form-control bg-light" rows="2" value={formData.address || ""} 
              onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
          </div>
          <div className="col-md-6">
            <label className="small text-muted">Department</label>
            <input type="text" className="form-control bg-light" value={formData.department || ""} 
              onChange={(e) => setFormData({...formData, department: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="small text-muted">Designation</label>
            <input type="text" className="form-control bg-light" value={formData.designation || ""} 
              onChange={(e) => setFormData({...formData, designation: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4 px-5 fw-bold shadow-sm">
          Save Profile Details
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
