import React, { useState, useEffect } from "react";
import axios from "axios";
import TopicAccordion from "../components/Topics/TopicAccordion";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  // Keep track of the currently open topic ID
  const [openTopicId, setOpenTopicId] = useState(null);

const fetchTopics = async () => {
  try {
    const res = await fetch("http://91.99.180.11:5000/api/topics/with-subtopics");
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = await res.json();
    setTopics(data);
  } catch (err) {
    console.error("Error fetching topics:", err);
  }
};

  useEffect(() => {
    fetchTopics();
  }, []);

const handleCreateTopic = async (e) => {
  e.preventDefault();
  setError("");

  if (!newTopic.trim()) {
    setError("Topic name is required");
    return;
  }

  try {
    const res = await fetch("http://91.99.180.11:5000/api/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic_name: newTopic }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to create topic");
    }

    setNewTopic("");
    setShowForm(false);
    fetchTopics(); // Refresh the topics list
  } catch (err) {
    console.error("Error creating topic:", err);
    setError(err.message || "Failed to create topic");
  }
};


  return (
    <div className="p-6 max-h-[86vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">Explore the Exciting Topics</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Topic
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateTopic}
          className="bg-white p-4 rounded-lg shadow mb-6 max-w-md"
        >
          <label className="block mb-2 font-medium">Topic Name</label>
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            className="border w-full p-2 rounded"
            placeholder="Enter topic name"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {topics.length === 0 ? (
          <p className="text-gray-500">No topics available</p>
        ) : (
          topics.map((topic) => (
            <TopicAccordion
              key={topic.id}
              topic={topic}
              refreshTopics={fetchTopics}
              isOpen={openTopicId === topic.id} // Pass prop to control open state
              setOpenTopicId={setOpenTopicId} // Allow accordion to update open topic
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Topics;
