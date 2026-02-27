import { useState, useEffect, useRef } from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
    const navigate = useNavigate();
    const hasShownLogoutToast = useRef(false); // 

    useEffect(() => {
        if (location.state?.fromLogout && !hasShownLogoutToast.current) {
          hasShownLogoutToast.current = true;
    
          toast.success("Logout berhasil! 👋");
    
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, [location, navigate]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    if (savedEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email dan password wajib diisi!");
      return;
    }

    const loading = toast.loading("Sedang login...");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;
      // Simpan email selalu
      if (rememberMe) {
        localStorage.setItem("remember_email", email);

        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;

        localStorage.setItem("token", token);
        localStorage.setItem("token_expiry", expiryTime);
      } else {
        localStorage.removeItem("remember_email");
        sessionStorage.setItem("token", token);
      }

      toast.dismiss(loading);

      navigate("/", {
        state: { fromLogin: true },
      });
    } catch {
      toast.dismiss(loading);
      toast.error("Email atau password salah!");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto mt-20 p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-center">Login with Email</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Masukkan email dan password untuk masuk ke sistem
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            className="mr-2 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded-2xl"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
