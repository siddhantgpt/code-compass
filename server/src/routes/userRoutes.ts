import express from "express";
import { getProfile, updateProfile } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);

export default router;
