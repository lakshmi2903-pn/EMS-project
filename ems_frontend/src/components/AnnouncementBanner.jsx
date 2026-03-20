import React, { useState, useEffect } from "react";
import API from "../services/api";

function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    API.get("announcements/")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.log("No news found"));
  }, []);

  // --- THE FIX IS HERE ---
  // If there are no announcements, don't show anything
  if (announcements.length === 0) return null;

  // Pick only the LATEST one from the list [0]
  const latest = announcements[0]; 

  return (
    <div className="bg-warning text-dark py-2 overflow-hidden shadow-sm" style={{ borderBottom: '2px solid #ffc107', width: '100%' }}>
      <div className="d-flex align-items-center">
        <span className="badge bg-danger ms-3 me-2 px-3 py-2 fw-bold">LATEST NEWS:</span>
        <marquee behavior="scroll" direction="left" className="fw-bold fs-6">
          {latest.title}: {latest.message} — Posted on {new Date(latest.created_at).toLocaleDateString()}
        </marquee>
      </div>
    </div>
  );
}

export default AnnouncementBanner;
