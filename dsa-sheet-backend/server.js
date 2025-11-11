import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import subtopicRoutes from "./routes/subtopicRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/subtopics", subtopicRoutes);
app.use("/api/progress", progressRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 DSA Sheet Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log(`✅ Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
});
