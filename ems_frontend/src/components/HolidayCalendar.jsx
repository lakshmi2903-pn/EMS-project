import React, { useState, useEffect } from "react";
import API from "../services/api";

function HolidayCalendar() {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    // Fetches the holiday list from your Django backend
    API.get("holidays/")
      .then((res) => setHolidays(res.data))
      .catch((err) => console.log("Holidays not found", err));
  }, []);

  if (holidays.length === 0) return null;

  return (
    <div className="card shadow-sm border-0 p-4 rounded-4 mt-4">
      <h5 className="fw-bold mb-3 text-secondary">📅 Upcoming Holidays</h5>
      <ul className="list-group list-group-flush">
        {holidays.map((h) => (
          <li key={h.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
            <span className="fw-bold text-dark">{h.name}</span>
            <span className="badge bg-success-subtle text-success rounded-pill px-3">{h.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HolidayCalendar;
