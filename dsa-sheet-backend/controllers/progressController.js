import pool from "../config/db.js";

// ✅ Get progress data
export const getProgress = async (req, res) => {
  try {
    // Difficulty counts
    const difficultyResult = await pool.query(
      "SELECT level, COUNT(*) AS value FROM subtopics GROUP BY level"
    );

    const difficultyData = difficultyResult.rows.map((row) => ({
      name: row.level,
      value: parseInt(row.value),
    }));

    // Status counts
    const statusResult = await pool.query(
      "SELECT status, COUNT(*) AS value FROM subtopics GROUP BY status"
    );

    const statusData = statusResult.rows.map((row) => ({
      name: row.status,
      value: parseInt(row.value),
    }));

    res.json({ difficultyData, statusData });
  } catch (err) {
    console.error("Error fetching progress data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
