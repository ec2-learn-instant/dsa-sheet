import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname.startsWith("/topics")) return "Topics Overview";
    if (location.pathname.startsWith("/progress")) return "Progress Overview";
    if (location.pathname.startsWith("/update-profile")) return "Update Profile";
    if (location.pathname.startsWith("/dashboard")) return "Dashboard";
    return "Dashboard";
  };

  const userInfo = localStorage.getItem("user");
  const parsedUserInfo = JSON.parse(userInfo);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 shadow-md p-2 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
      {/* Left Section — Page Title */}
      <h2 className="ml-5 text-lg font-semibold text-gray-800 tracking-wide">
        {getTitle()}
      </h2>

      {/* Right Section — User Info + Logout */}
      <div className="flex items-center space-x-5">
        {/* Avatar */}
        <div className="flex items-center space-x-3 border-2 px-5 py-2 rounded-2xl border-gray-300 hover:shadow-md transition-shadow cursor-default">
          <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-500 bg-gray-100 text-gray-600 font-bold shadow-sm hover:scale-105 transition-transform">
            {parsedUserInfo?.username?.charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-800 font-medium tracking-wide">
            {parsedUserInfo?.username}
          </span>
        </div>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-red-50 hover:border-red-400 hover:text-red-500 text-gray-600 transition-all duration-200"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
