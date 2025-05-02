import express from "express";
import {
  getProgress,
  updateProgress,
} from "../controllers/userProgressController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/progress", authMiddleware, getProgress);
router.post("/progress", authMiddleware, updateProgress);

export default router;
