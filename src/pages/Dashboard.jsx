import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (location.state?.fromLogin && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.success("Login Berhasil! 🎉");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard 🎈</h1>
        <p className="text-gray-500">Ringkasan data TK Ceria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value="120" icon="👶" color="pink" />

        <StatCard title="Total Guru" value="8" icon="👩‍🏫" color="blue" />

        <StatCard title="Total Kegiatan" value="24" icon="🎨" color="yellow" />

        <StatCard title="Foto Galeri" value="156" icon="📸" color="green" />
      </div>
    </AdminLayout>
  );
}
