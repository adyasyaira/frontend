import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    sessionStorage.removeItem("token");

    navigate("/login", {
      state: { fromLogout: true },
    });
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "none",
      }}
    >
      <h3 className="text-gray-800">Admin Panel</h3>

      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Logout
      </button>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        title="Logout dari sistem?"
        message="Kamu akan keluar dari akun ini dan kembali ke halaman login."
        confirmText="Ya, Logout"
        type="danger"
      />
    </div>
  );
}
