import pool from "./../config/db.js";

// ✅ Create new topic
export const createTopic = async (req, res) => {
  const { topic_name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO topics (topic_name) VALUES ($1) RETURNING *",
      [topic_name]
    );
    res.status(201).json({ message: "Topic created successfully", topic: result.rows[0] });
  } catch (err) {
    console.error("Error creating topic:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all topics with subtopics
export const getTopicsWithSubtopics = async (req, res) => {
  try {
    // Fetch topics
    const topicsResult = await pool.query(
      "SELECT id, topic_name, created_at FROM topics ORDER BY created_at ASC"
    );

    // Fetch subtopics
    const subtopicsResult = await pool.query(
      "SELECT id, topic_id, subtopic_name, level, status, leetcode_link, youtube_link, article_link FROM subtopics ORDER BY created_at DESC"
    );

    // Merge topics and subtopics
    const topics = topicsResult.rows.map((topic) => ({
      ...topic,
      subtopics: subtopicsResult.rows.filter((s) => s.topic_id === topic.id),
    }));

    res.status(200).json(topics);
  } catch (err) {
    console.error("Error fetching topics:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update topic
export const updateTopic = async (req, res) => {
  const { id } = req.params;
  const { topic_name } = req.body;

  try {
    const result = await pool.query(
      "UPDATE topics SET topic_name = $1 WHERE id = $2 RETURNING *",
      [topic_name, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Topic not found" });

    res.status(200).json({ message: "Topic updated successfully", topic: result.rows[0] });
  } catch (err) {
    console.error("Error updating topic:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete topic
export const deleteTopic = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM topics WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Topic not found" });

    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (err) {
    console.error("Error deleting topic:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
