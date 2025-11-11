import React, { useEffect, useState } from "react";
import {  FiTrash2 } from "react-icons/fi";

 const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <p className="mb-4 text-gray-800">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


const SubtopicsTable = ({ subtopics, refreshTopics }) => {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, subtopicId: null });

  useEffect(() => {
    setTasks(subtopics);
  }, [subtopics]);

  const handleStatusChange = async (id) => {
    const subtopic = tasks.find((s) => s.id === id);
    if (!subtopic) return;

    const newStatus = subtopic.status === "Done" ? "Pending" : "Done";

    try {
      const res = await fetch(`http://91.99.180.11:5000/api/subtopics/${id}`, {
        method: "PUT", // assuming your backend uses PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status");
      }

      // Update local state
      setTasks(
        tasks.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
      refreshTopics();
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.message);
    }
  };

   const confirmDelete = (id) => {
    setModal({ isOpen: true, subtopicId: id });
  };

  const handleDelete = async () => {
    const id = modal.subtopicId;
    try {
      const res = await fetch(`http://91.99.180.11:5000/api/subtopics/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete subtopic");
      }

      setTasks(tasks.filter((t) => t.id !== id));
      refreshTopics();
    } catch (err) {
      console.error("Error deleting subtopic:", err);
      alert(err.message);
    } finally {
      setModal({ isOpen: false, subtopicId: null });
    }
  };


  return (
    <div className="overflow-x-auto mt-3">
      <table className="min-w-full border border-gray-200 rounded-lg text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              {/* Checkbox header placeholder */}
              {/* <input type="checkbox" disabled /> */}
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Topic Name
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              LeetCode Link
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              YouTube Link
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Article Link
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Level
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Status
            </th>
            <th className="px-4 py-2 text-left text-gray-700 font-semibold text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((s) => (
            <tr
              key={s.id}
              className={`border-t hover:bg-gray-50 transition-colors ${
                s.status === "Done" ? "opacity-85" : ""
              }`}
            >
              {/* Checkbox */}
              <td className="px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={s.status === "Done"}
                  onChange={() => handleStatusChange(s.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </td>

              {/* Name */}
              <td
                className={`px-4 py-2 font-medium text-gray-500 cursor-pointer ${
                  s.status === "Done"
                    ? "text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {s.subtopic_name}
              </td>

              {/* LeetCode Link */}
              <td className="px-4 py-2 text-blue-500 hover:text-blue-700 underline">
                {s.leetcode_link ? (
                  <a href={s.leetcode_link} target="_blank" rel="noreferrer">
                    Practice
                  </a>
                ) : (
                  "-"
                )}
              </td>

              {/* YouTube Link */}
              <td className="px-4 py-2 text-red-500 hover:text-red-700 underline">
                {s.youtube_link ? (
                  <a href={s.youtube_link} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                ) : (
                  "-"
                )}
              </td>

              {/* Article Link */}
              <td className="px-4 py-2 text-gray-600 hover:text-gray-800 underline">
                {s.article_link ? (
                  <a href={s.article_link} target="_blank" rel="noreferrer">
                    Read
                  </a>
                ) : (
                  "-"
                )}
              </td>

              {/* Level */}
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    s.level === "Easy"
                      ? "bg-green-100 text-green-700"
                      : s.level === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.level}
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    s.status === "Done"
                      ? "bg-green-50 text-green-700 border border-green-300"
                      : "bg-gray-50 text-gray-700 border border-gray-300"
                  }`}
                >
                  {s.status}
                </span>
              </td>

             <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => confirmDelete(s.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.isOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this subtopic?"
          onConfirm={handleDelete}
          onCancel={() => setModal({ isOpen: false, subtopicId: null })}
        />
      )}

     



    </div>
  );
};

export default SubtopicsTable;
