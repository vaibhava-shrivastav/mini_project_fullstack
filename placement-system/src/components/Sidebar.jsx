import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard", roles: ["student"] },
  { to: "/opportunities", label: "Opportunities", roles: ["student"] },
  { to: "/tracking", label: "Application Tracking", roles: ["student"] },
  { to: "/profile", label: "Profile", roles: ["student"] },
  { to: "/resume", label: "Resume", roles: ["student"] },
  { to: "/career", label: "Career Management", roles: ["student"] },
  { to: "/notifications", label: "Notifications", roles: ["student", "admin"] },
  { to: "/statistics", label: "Statistics", roles: ["student", "admin"] },
  { to: "/admin", label: "Admin", roles: ["admin"] },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <ul>
        {links.filter((l) => l.roles.includes(user.role)).map((l) => (
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
