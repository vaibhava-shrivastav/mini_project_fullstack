import notifications from "../data/notificationsData";

export default function Notifications() {
  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <p>Stay updated with placement and career-related announcements.</p>
      </div>

      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            className={`notification-card ${
              notification.read ? "read" : "unread"
            }`}
            key={notification.id}
          >
            <div className="notification-content">
              <div className="notification-top">
                <span className="notification-type">
                  {notification.type}
                </span>

                <span className="notification-date">
                  {notification.date}
                </span>
              </div>

              <h2>{notification.title}</h2>

              <p>{notification.message}</p>
            </div>

            {!notification.read && (
              <span className="unread-badge">New</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}