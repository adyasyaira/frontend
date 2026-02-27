import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import ConfirmModal from "./ConfirmModal";
import avatar from "../assets/avatar.jpg";

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
    <div className="bg-white px-6 py-4 flex justify-between items-center">
      <h3 className="text-gray-800 font-semibold">
        Admin Panel
      </h3>

      <Dropdown
        inline
        arrowIcon={false}
        className="w-56 rounded-xl border border-gray-100 shadow-lg"
        renderTrigger={() => (
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-gray-50 transition cursor-pointer">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 hover:ring-blue-400 transition"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                Hello, Admin
              </p>
              <p className="text-xs text-gray-500 leading-none mt-0.5">
                Super Admin
              </p>
            </div>
          </div>
        )}
      >
        <DropdownHeader className="border-b border-gray-100">
          <span className="block text-sm font-semibold text-gray-800">
            Super Admin
          </span>
          <span className="block truncate text-xs text-gray-500">
            admin@tk.com
          </span>
        </DropdownHeader>

        <DropdownItem
          onClick={() => setOpen(true)}
          className="text-red-600 hover:bg-red-50"
        >
          Logout
        </DropdownItem>
      </Dropdown>

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