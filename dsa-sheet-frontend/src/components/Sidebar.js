import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block py-2 px-3 rounded transition ${
      isActive
        ? "bg-gray-700 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {/* <NavLink to="/dashboard" className={linkClasses}>
          Dashboard
        </NavLink> */}
        <NavLink to="/topics" className={linkClasses}>
          Topics
        </NavLink>
        <NavLink to="/progress" className={linkClasses}>
          Progress
        </NavLink>
        <NavLink to="/profile" className={linkClasses}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
