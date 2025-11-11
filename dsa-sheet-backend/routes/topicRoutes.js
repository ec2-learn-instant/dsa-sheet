import express from "express";
import {
  createTopic,
  getTopicsWithSubtopics,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController.js";

const router = express.Router();

router.post("/", createTopic);
router.get("/with-subtopics", getTopicsWithSubtopics);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

export default router;
