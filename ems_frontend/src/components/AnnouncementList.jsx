import React, { useState, useEffect } from "react";
import API from "../services/api";

function AnnouncementList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get("announcements/").then((res) => setNews(res.data));
  }, []);

  return (
    <div className="card shadow border-0 p-4 rounded-4">
      <h3 className="text-primary fw-bold mb-4">📢 Company News & Announcements</h3>
      <div className="list-group">
        {news.map((item) => (
          <div key={item.id} className="list-group-item border-0 border-bottom py-3">
            <h5 className="fw-bold text-success">{item.title}</h5>
            <p className="mb-1">{item.message}</p>
            <small className="text-muted">Posted on: {new Date(item.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementList;
