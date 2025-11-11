import express from "express";
import { getProgress } from "../controllers/progressController.js";

const router = express.Router();

// GET /api/progress
router.get("/", getProgress);

export default router;
