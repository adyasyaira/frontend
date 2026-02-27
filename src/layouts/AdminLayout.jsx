import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-[calc(100vw-250px)]">
        <Navbar />

        <div className="p-6 bg-gray-100 min-h-[calc(100vh-64px)] mr-[15px] rounded-t-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}