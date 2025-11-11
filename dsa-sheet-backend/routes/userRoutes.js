import express from "express";
import { updateUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // optional, if you have token auth

const router = express.Router();

// PUT /api/users/update
router.put("/update", verifyToken, updateUserProfile);

export default router;
