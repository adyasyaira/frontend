import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, permission }) {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const permissions = JSON.parse(
    localStorage.getItem("user_permissions") || "[]"
  );

  // 🔐 Belum login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Tidak punya permission
  if (permission && !permissions.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}