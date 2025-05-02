import express from "express";
import { register, login, updatePassword } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", authMiddleware, updatePassword);

export default router;