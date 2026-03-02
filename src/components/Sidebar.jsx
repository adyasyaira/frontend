import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api";

export default function Sidebar() {
  const location = useLocation();
  const [menus, setMenus] = useState([]);

  const iconMap = {
    faBars,
  };

  useEffect(() => {
    fetchSidebar();
  }, []);

  const fetchSidebar = async () => {
    try {
      const res = await api.get("/sidebar");
      setMenus(res.data);
    } catch (error) {
      console.error("Sidebar load failed", error);
    }
  };

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
      <h2 className="mb-7 font-bold text-center">CMS TK</h2>

      <ul className="space-y-2">

        {/* 🔹 STATIC DASHBOARD */}
        <li>
          <Link
            to="/"
            className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === "/"
                ? "bg-blue-100 text-blue-500 shadow-sm"
                : "text-gray-600 hover:bg-blue-50"
            }`}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-sm ${
                location.pathname === "/"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </li>

        {/* 🔹 DYNAMIC MENUS */}
        {menus.map((item) => {
          const isActive = location.pathname === `/${item.slug}`;
          const IconComponent = iconMap[item.icon] || faBars;

          return (
            <li key={item.id}>
              <Link
                to={`/${item.slug}`}
                className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-500 shadow-sm"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                {isActive && (
                  <span className="absolute -left-3 top-0 h-full w-1 bg-blue-500 rounded-full"></span>
                )}

                <FontAwesomeIcon
                  icon={IconComponent}
                  className={`text-sm ${
                    isActive ? "text-blue-500" : "text-gray-400"
                  }`}
                />

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </Link>

              {/* CHILDREN */}
              {item.children?.length > 0 && (
                <ul className="ml-6 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        to={`/${child.slug}`}
                        className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition ${
                          location.pathname === `/${child.slug}`
                            ? "bg-blue-100 text-blue-500"
                            : "text-gray-500 hover:bg-blue-50"
                        }`}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}