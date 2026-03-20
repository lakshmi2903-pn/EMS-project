import React, { useState, useEffect } from "react";
import API from "../services/api";

function AdminLeaves() {
  const [allLeaves, setAllLeaves] = useState([]);

  useEffect(() => {
    fetchAdminLeaves();
  }, []);

  const fetchAdminLeaves = async () => {
    try {
      // Admin request to get ALL leave requests from the backend
      const res = await API.get("leave/"); 
      setAllLeaves(res.data);
    } catch (err) {
      console.error("Error fetching all leaves", err);
    }
  };

  // Keep this function INSIDE the AdminLeaves component
  const updateStatus = async (id, action) => {
    try {
      // 1. Make sure the URL ends with a slash '/'
      // 2. The 'action' variable must be 'approve' or 'reject'
      await API.post(`leave/${id}/${action}/`); 
      
      alert(`Leave request ${action}ed successfully!`);
      
      // 3. Refresh the table data so the badge turns green/red immediately
      fetchAdminLeaves(); 
    } catch (err) {
      // Check if it's a 404 or something else in the console
      console.error("Error updating status:", err.response);
      alert("Failed to update status. Check console for details.");
    }
  };

  return (
    <div className="card shadow border-0 p-4 rounded-4">
      <h3 className="text-success fw-bold mb-4">📋 All Employee Leave Requests</h3>
      
      <table className="table table-hover mt-3 align-middle">
        <thead className="table-dark">
          <tr>
            <th>Employee (ID)</th>
            <th>Dates</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allLeaves.map((l) => (
            <tr key={l.id}>
              <td><strong>{l.username}</strong></td>
              <td>{l.start_date} to {l.end_date}</td>
              <td className="small text-muted">{l.reason}</td>
              <td>
                <span className={`badge ${
                  l.status === 'Approved' ? 'bg-success' : 
                  l.status === 'Rejected' ? 'bg-danger' : 'bg-warning'
                }`}>
                  {l.status}
                </span>
              </td>
              <td>
                {/* Only show buttons if the status is still Pending */}
                {l.status === "Pending" && (
                  <div className="btn-group shadow-sm">
                    <button 
                      className="btn btn-sm btn-success px-3" 
                      onClick={() => updateStatus(l.id, 'approve')}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn btn-sm btn-danger px-3" 
                      onClick={() => updateStatus(l.id, 'reject')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLeaves;
