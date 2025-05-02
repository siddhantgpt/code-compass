import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUserName(res.data.fullName || res.data.email);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    fetchUser();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow w-full shadow-sm border-b">
      <div className="w-full flex justify-between items-center p-4">
        {/* Left - Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src="/logo.png" // replace with actual filename in /public folder
            alt="Code Compass Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-purple-700">
            Code Compass
          </span>
        </Link>
        {/* Center - Nav Links */}
        <div className="flex gap-6 items-center">
          <Link
            to="/dashboard"
            className={`text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-50 transition ${
              isActive("/dashboard")
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/topics"
            className={`text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-50 transition ${
              isActive("/topics")
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700"
            }`}
          >
            Topics
          </Link>
          <Link
            to="/profile"
            className={`text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-50 transition ${
              isActive("/profile")
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700"
            }`}
          >
            Profile
          </Link>
        </div>

        {/* Right - User & Logout */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Hi, <span className="font-semibold">{userName}</span>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
