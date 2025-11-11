import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setNewUsername(storedUser.username);
    }
  }, []);

  const handleUpdate = async () => {
    setMessage({ text: "", type: "" });

    if (!newUsername.trim()) {
      return setMessage({ text: "Username cannot be empty.", type: "error" });
    }

    if (newUsername.trim() === user.username) {
      return setMessage({ text: "No changes detected.", type: "error" });
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // ✅ Update local user info
      const updatedUser = { ...user, username: data.user.username };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Profile
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email ID</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Username Field */}
        <div className="mb-2">
          <label className="block text-gray-600 text-sm mb-1">Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
              setMessage({ text: "", type: "" });
            }}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
              message.type === "error"
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your username"
          />
        </div>

        {/* Inline Message */}
        {message.text && (
          <p
            className={`text-center text-sm mt-1 mb-3 ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={loading || newUsername.trim() === user.username}
          className={`w-full ${
            loading || newUsername.trim() === user.username ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded-lg font-medium transition mt-4`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
