import { Link } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/opportunities", label: "Placement Opportunities" },
    { to: "/career", label: "Career Management" },
    { to: "/notifications", label: "Notifications" },
  ];
  return (
    <aside className="sidebar">
      <ul>
        {links.map((l) => (
          <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
        ))}
      </ul>
    </aside>
  );
}
