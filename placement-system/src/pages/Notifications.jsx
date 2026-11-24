import { useState } from "react";
import { useData } from "../context/DataContext";
import "./Notifications.css";

export default function Notifications() {
  const { announcements, markAsRead, markAllAsRead, resetNotifications } = useData();
  const [filter, setFilter] = useState("all");

  const getIcon = (type) => {
    const t = (type || "").toLowerCase();
    if (t.includes("deadline")) return "⏳";
    if (t.includes("interview")) return "👥";
    if (t.includes("placement") || t.includes("drive")) return "💼";
    if (t.includes("career")) return "🎓";
    return "📢";
  };

  const filtered = (announcements || []).filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    const t = (n.type || "").toLowerCase();
    return t.includes(filter);
  });

  const unreadCount = (announcements || []).filter((n) => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="notif-header">
        <div>
          <h2>Notifications & Announcements</h2>
          <p className="muted">
            Stay updated with campus recruitment drives, interview schedules, and deadlines.
          </p>
        </div>

        <div className="notif-actions">
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={markAllAsRead} type="button">
              Mark All as Read ({unreadCount})
            </button>
          )}
          <button className="btn btn-outline" onClick={resetNotifications} type="button">
            ↻ Reset Sample Data
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="notif-filter-bar">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: `Unread (${unreadCount})` },
          { key: "placement", label: "Placements" },
          { key: "interview", label: "Interviews" },
          { key: "deadline", label: "Deadlines" },
          { key: "career", label: "Career" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`notif-filter-pill ${filter === tab.key ? "active" : ""}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="panel notif-empty-panel">
          <div className="notif-empty-icon">📭</div>
          <h3>No notifications found</h3>
          <p className="empty">
            {filter === "all"
              ? "You have no notifications right now."
              : `No notifications match the "${filter}" filter.`}
          </p>
          <button className="btn" onClick={resetNotifications} type="button">
            Load Notifications
          </button>
        </div>
      ) : (
        <ul className="notif-list">
          {filtered.map((n) => (
            <li
              key={n.id}
              className={`notif notif-card ${(n.type || "").toLowerCase()} ${
                n.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead && markAsRead(n.id)}
            >
              <div className="notif-icon-col">{getIcon(n.type)}</div>
              <div className="notif-content-col">
                <div className="notif-top-row">
                  <span className="notif-title">
                    {n.title || (n.type ? n.type.toUpperCase() : "Announcement")}
                  </span>
                  <div className="notif-badges">
                    <span className="notif-tag">
                      {(n.type || "announcement").toUpperCase()}
                    </span>
                    <span className="notif-date">{n.date || "Recent"}</span>
                    {!n.read && <span className="notif-unread-dot" title="Unread" />}
                  </div>
                </div>

                <p className="notif-message">{n.message || n.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
