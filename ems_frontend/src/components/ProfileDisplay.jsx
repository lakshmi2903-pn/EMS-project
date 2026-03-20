import React, { useState, useEffect } from "react";
import API from "../services/api";

function ProfileDisplay() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This fetches the personal details from your Django backend
    API.get("profiles/me/")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Could not load profile", err));
  }, []);

  if (!data) return <div className="text-center mt-5">Loading Profile Details...</div>;

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="text-secondary fw-bold mb-4 border-bottom pb-2">👤 Personal Details</h4>
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <label className="small text-muted fw-bold">First Name</label>
          <div className="p-2 bg-light rounded border">{data.first_name || "Not set"}</div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="small text-muted fw-bold">Last Name</label>
          <div className="p-2 bg-light rounded border">{data.last_name || "Not set"}</div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="small text-muted fw-bold">Email Address</label>
          <div className="p-2 bg-light rounded border">{data.email || "Not set"}</div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="small text-muted fw-bold">Phone Number</label>
          <div className="p-2 bg-light rounded border">{data.phone || "Not set"}</div>
        </div>
        <div className="col-12 mb-3">
          <label className="small text-muted fw-bold">Current Address</label>
          <div className="p-2 bg-light rounded border">{data.address || "Not set"}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplay;
