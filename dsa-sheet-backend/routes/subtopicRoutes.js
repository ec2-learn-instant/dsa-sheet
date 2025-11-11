import express from "express";
import { createSubtopic } from "../controllers/subtopicController.js";
import { deleteSubtopic } from "../controllers/subtopicController.js";
import { updateSubtopic } from "../controllers/subtopicController.js";
const router = express.Router();

router.post("/", createSubtopic);
router.put("/:id", updateSubtopic);
router.delete("/:id", deleteSubtopic);

export default router;
