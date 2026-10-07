import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Pill,
  FlaskConical,
  Clock3,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { t } = useApp();

  const links = [
    {
      to: "/dashboard",
      label: t.dashboard,
      icon: LayoutDashboard,
    },
    {
      to: "/reports",
      label: t.reports,
      icon: FileText,
    },
    {
      to: "/medicines",
      label: t.medicines,
      icon: Pill,
    },
    {
      to: "/labs",
      label: t.labResults,
      icon: FlaskConical,
    },
    {
      to: "/timeline",
      label: t.timeline,
      icon: Clock3,
    },
    {
      to: "/profile",
      label: t.profile,
      icon: User,
    },
  ];

  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">+</div>

          <div>
            <strong>Health Copilot</strong>
            <span>AI Health Assistant</span>
          </div>
        </div>

        <nav>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <nav className="mobile-nav">
        {links.slice(0, 5).map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}