import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileDisplay from "../components/ProfileDisplay";
import LeaveManagement from "../components/LeaveManagement";
import AdminLeaves from "../components/AdminLeaves";
import AnnouncementBanner from "../components/AnnouncementBanner"; 
import HolidayCalendar from "../components/HolidayCalendar";
import AnnouncementList from "../components/AnnouncementList";
// 1. ADD THIS NEW COMPONENT (We'll create it next)
import EmployeeDirectory from "../components/EmployeeDirectory"; 

function Dashboard({ userRole, setIsLoggedIn }) {
  const [view, setView] = useState("profile");

  return (
    <div className="d-flex bg-light" style={{ minHeight: "100vh" }}>
      {/* Sidebar handles switching the 'view' state */}
      <Sidebar setView={setView} userRole={userRole} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="flex-grow-1">
        {/* The yellow banner from your image */}
        <AnnouncementBanner />

        <div className="p-5">
          {/* --- 1. EVERYONE VIEWS --- */}
          {view === "profile" && <ProfileDisplay />}
          {view === "leaves" && <LeaveManagement />}

          {/* --- 2. ADMIN PANEL VIEWS --- */}
          {/* This is how the admin sees all employee details */}
          {view === "employee_list" && userRole === "admin" && <EmployeeDirectory />}
          
          {view === "admin_leaves" && userRole === "admin" && <AdminLeaves />}
          {view === "holidays" && userRole === "admin" && <HolidayCalendar />}
          {view === "announcements" && userRole === "admin" && <AnnouncementList />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
