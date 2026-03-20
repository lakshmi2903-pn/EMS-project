import React from "react";

function Sidebar({ setView, userRole, setIsLoggedIn }) {
  return (
    <div className="bg-success text-white p-4 vh-100 shadow" style={{ width: "260px" }}>
      <h2 className="fw-bold mb-5 border-bottom pb-3 text-center">EMS</h2>
      
      <div className="nav flex-column gap-3">
        {/* --- EVERYONE SEES THESE --- */}
        <button className="btn text-white text-start border-0 shadow-sm" onClick={() => setView("profile")}>
          👤 My Profile
        </button>
        
        <button className="btn text-white text-start border-0 shadow-sm" onClick={() => setView("leaves")}>
          ✈️ My Leaves
        </button>

        {/* --- ADMIN ONLY PANEL --- */}
        {userRole === "admin" && (
          <div className="mt-4 pt-4 border-top border-light">
            <small className="text-white-50 fw-bold mb-2 d-block">ADMIN PANEL</small>
            
            {/* 1. View All Employees (How the admin sees everyone) */}
            <button className="btn text-white text-start border-0 shadow-sm mb-2 w-100" onClick={() => setView("employee_list")}>
              👥 All Employees
            </button>

            {/* 2. All Requests */}
            <button className="btn text-white text-start border-0 shadow-sm mb-2 w-100" onClick={() => setView("admin_leaves")}>
              📋 All Requests
            </button>

            {/* 3. Holiday Calendar */}
            <button className="btn text-white text-start border-0 shadow-sm mb-2 w-100" onClick={() => setView("holidays")}>
              📅 Holiday Calendar
            </button>

            {/* 4. Company News */}
            <button className="btn text-white text-start border-0 shadow-sm w-100" onClick={() => setView("announcements")}>
              📢 Company News
            </button>
          </div>
        )}
      </div>

      <button className="btn btn-outline-light w-100 mt-5 border-0 text-start px-3" onClick={() => setIsLoggedIn(false)}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;
