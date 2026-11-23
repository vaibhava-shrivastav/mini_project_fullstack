
import { useData } from "../context/DataContext";

export default function Notifications() {
  const { announcements } = useData();

  return (
    <div>
      <h2>Notifications</h2>

      {announcements.length === 0 && (
        <p className="empty">No notifications right now.</p>
      )}

      <ul className="notif-list">
        {announcements.map((n) => (
          <li key={n.id} className={`notif ${n.type}`}>
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
