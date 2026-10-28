import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/opportunities", label: "Opportunities" },
    { to: "/tracking", label: "Application Tracking" },
    { to: "/resume", label: "Resume" },
    { to: "/career", label: "Career Management" },
    { to: "/notifications", label: "Notifications" },
    { to: "/statistics", label: "Statistics" },
    { to: "/admin", label: "Admin" },
  ];
  return (
    <aside className="sidebar">
      <ul>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
