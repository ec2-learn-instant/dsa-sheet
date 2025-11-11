import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL Database");
});

// Handle connection errors
pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL error:", err.message);
  process.exit(1); // Exit process to prevent undefined behavior
});

// Optional: verify connection on startup
(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("🟢 PostgreSQL connection verified successfully");
  } catch (err) {
    console.error("🚨 PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
})();

export default pool;
