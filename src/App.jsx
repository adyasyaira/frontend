import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import MenuManagement from "./pages/MenuManagement";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/menu-management"
            element={
              <ProtectedRoute permission="manage menu">
                <MenuManagement />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;