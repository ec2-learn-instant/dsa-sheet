import pool from "./../config/db.js";

// ✅ Update user profile (username only)
export const updateUserProfile = async (req, res) => {
  const userId = req.user.id; // extracted from JWT middleware
  const { username } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username cannot be empty" });
  }

  try {
    // Check if user exists
    const userResult = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the username
    const updateResult = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING id, email, username",
      [username.trim(), userId]
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updateResult.rows[0],
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
