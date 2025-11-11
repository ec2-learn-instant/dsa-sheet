import pool from "../config/db.js";

// ✅ Create a new subtopic
export const createSubtopic = async (req, res) => {
  const { topic_id, name, level, status, leetcode, youtube, article } = req.body;

  if (!topic_id || !name || !level || !status) {
    return res.status(400).json({ message: "Topic ID, name, level and status are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO subtopics 
      (topic_id, subtopic_name, level, status, leetcode_link, youtube_link, article_link) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [topic_id, name, level, status, leetcode || "", youtube || "", article || ""]
    );

    res.status(201).json({
      message: "Subtopic created successfully",
      subtopic: result.rows[0],
    });
  } catch (err) {
    console.error("Error creating subtopic:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/subtopics/:id
export const updateSubtopic = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE subtopics SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Subtopic not found" });
    }

    res.status(200).json({ message: "Status updated", subtopic: result.rows[0] });
  } catch (err) {
    console.error("Error updating subtopic:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Delete a subtopic
export const deleteSubtopic = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Subtopic ID is required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM subtopics WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Subtopic not found" });
    }

    res.status(200).json({ message: "Subtopic deleted successfully" });
  } catch (err) {
    console.error("Error deleting subtopic:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
