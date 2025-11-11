import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiPlusCircle, FiXSquare  } from "react-icons/fi";
import SubtopicsTable from "./SubtopicsTable";
import axios from "axios";

const TopicAccordion = ({ topic, refreshTopics, isOpen, setOpenTopicId }) => {
  const [showForm, setShowForm] = useState(false);
  const [subtopics, setSubtopics] = useState(topic.subtopics);

  useEffect(() => {
    setSubtopics(topic.subtopics);
  }, [topic.subtopics]);

  const [subtopicData, setSubtopicData] = useState({
    name: "",
    level: "Easy",
    status: "Pending",
    leetcode: "",
    youtube: "",
    article: "",
  });

  const pendingCount = subtopics.filter((s) => s.status === "Pending").length;
  const completedCount = subtopics.filter((s) => s.status === "Done").length;

  // ✅ Submit new subtopic using fetch and update local state
  const handleAddSubtopic = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/subtopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic_id: topic.id,
          ...subtopicData,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create subtopic");
      }

      const newSubtopic = await res.json();
      // Add newly created subtopic to local state
      setSubtopics((prev) => [...prev, newSubtopic.subtopic]);
      refreshTopics();

      // Clear form
      setSubtopicData({
        name: "",
        level: "Easy",
        status: "Pending",
        leetcode: "",
        youtube: "",
        article: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding subtopic:", err);
      alert(err.message);
    }
  };
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm bg-white">
      {/* Header */}
      <div
        onClick={() => setOpenTopicId(isOpen ? null : topic.id)}
        className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
      >
        <h3 className="text-lg font-medium text-gray-800">
          {topic.topic_name} {subtopics.length > 0 && `(${subtopics.length})`}
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md font-medium">
              Pending: {pendingCount}
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
              Completed: {completedCount}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowForm(!showForm);
            }}
            className="text-blue-500 hover:text-blue-600"
            title="Add Subtopic"
          >
            {!showForm ? isOpen && <FiPlusCircle size={20} />  : <FiXSquare  size={20} />}
          </button>
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      {/* Add Subtopic Form */}
      {showForm && (
        <form
          className="px-5 py-4 border-t border-gray-200"
          onSubmit={handleAddSubtopic}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Subtopic Name"
              value={subtopicData.name}
              onChange={(e) =>
                setSubtopicData({ ...subtopicData, name: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
            <select
              value={subtopicData.level}
              onChange={(e) =>
                setSubtopicData({ ...subtopicData, level: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <select
              value={subtopicData.status}
              onChange={(e) =>
                setSubtopicData({ ...subtopicData, status: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option>Pending</option>
              <option>Done</option>
            </select>
            <input
              type="url"
              placeholder="LeetCode Link"
              value={subtopicData.leetcode}
              onChange={(e) =>
                setSubtopicData({ ...subtopicData, leetcode: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="url"
              placeholder="YouTube Link"
              value={subtopicData.youtube}
              onChange={(e) =>
                setSubtopicData({ ...subtopicData, youtube: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="url"
              placeholder="Article Link"
              value={subtopicData.article}
              onChange={(e) =>
                setSubtopicData({ ...subtopicData, article: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Subtopic
          </button>
        </form>
      )}

      <div
        className={`px-5 border-t border-gray-200 transition-all overflow-hidden ${
          isOpen ? "max-h-screen pb-4 " : "max-h-0"
        }`}
      >
        {/* {subtopics.length} */}
        {subtopics.length > 0 ? (
          <SubtopicsTable subtopics={subtopics} refreshTopics={refreshTopics} />
        ) : (
          <p className="text-gray-500 text-sm py-4">
            No subtopics available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopicAccordion;
