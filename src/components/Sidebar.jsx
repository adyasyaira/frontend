import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faImage,
  faUser,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: faHome, path: "/" },
    { name: "Hero Section", icon: faImage, path: "/hero" },
    { name: "Data Guru", icon: faUser, path: "/about" },
    { name: "Gallery Section", icon: faPhotoFilm, path: "/gallery" },
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
      <h2 className="mb-7 font-bold text-center">CMS TK</h2>
      <ul className="space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
            relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
            ${
              isActive
                ? "bg-blue-100 text-blue-500 shadow-sm"
                : "text-gray-600 hover:bg-blue-50"
            }
          `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute -left-3 top-0 h-full w-1 bg-blue-500 rounded-full"></span>
                )}

                {/* Icon */}
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-sm ${
                    isActive ? "text-blue-500" : "text-gray-400"
                  }`}
                />

                {/* Text */}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
