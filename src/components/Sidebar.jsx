import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Hero Section", path: "/hero" },
  ];

  return (
    <div
      style={{
        width: "250px",
        background: "#fff",
        color: "#333",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>CMS TK 🎈</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menu.map((item) => (
          <li key={item.path} style={{ margin: "15px 0" }}>
            <Link
              to={item.path}
              style={{
                color: location.pathname === item.path ? "#facc15" : "#333",
                textDecoration: "none",
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
