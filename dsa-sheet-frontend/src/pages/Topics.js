import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import TopicAccordion from "../components/Topics/TopicAccordion";
import { FiLoader } from "react-icons/fi";
import { TOPICS_ABD_SUBTOPICS_URL, TOPICS_URL } from "../endpoint";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [addTopicLoading, setAddTopicLoading] = useState(false);
  
  // Keep track of the currently open topic ID
  const [openTopicId, setOpenTopicId] = useState(null);

const fetchTopics = async (showLoading) => {
     showLoading && setLoading(true);
  try {
    const res = await fetch(TOPICS_ABD_SUBTOPICS_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = await res.json();
    setTopics(data);
  } catch (err) {
    console.error("Error fetching topics:", err);
  } finally {
      setLoading(false); 
    }
};

  useEffect(() => {
    fetchTopics(true);
  }, []);

const handleCreateTopic = async (e) => {
  e.preventDefault();
  setError("");

  if (!newTopic.trim()) {
    setError("Topic name is required");
    return;
  }
setAddTopicLoading(true);
  try {
    const res = await fetch(TOPICS_URL, {
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
  } finally {
      setAddTopicLoading(false); 
    }
};


  return (
    <div className="p-6 max-h-[86vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl">Explore the Exciting Topics</h2>
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
              disabled={addTopicLoading}
               className={`flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
        addTopicLoading ? "cursor-not-allowed opacity-70" : ""
      }`}
            >
              {addTopicLoading && <FiLoader className="animate-spin mr-2" size={20} />}
      {addTopicLoading ? "Adding..." : "Add"}
            </button>
               <button
            onClick={() => setShowForm(!showForm)}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

{loading ? (
       <Loader />
      ) : (
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
      </div> )}
    </div>
  );
};

export default Topics;
