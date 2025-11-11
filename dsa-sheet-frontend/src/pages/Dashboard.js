// src/pages/Dashboard.js
import React from "react";

const Dashboard = () => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="mt-10 flex flex-col justify-between bg-gray-100">
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user.username || "User"}!
        </h1>
        <p className="text-lg text-gray-700">{user.email || "No Email Found"}</p>
      </div>

      {/* Footer */}
      <footer className="text-sm mt-10 bg-gray-300 rounded-xl text-black py-4 text-center">
        ©2025 Sakthivel Govinthan, All Rights Reserved
      </footer>
    </div>
  );
};

export default Dashboard;
