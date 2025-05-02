import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import problemRoutes from "./routes/problemRoutes";
import userProgressRoutes from "./routes/userProgressRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api", userProgressRoutes);
app.use(
  "/api/user",
  (req, res, next) => {
    console.log("Hit /api/user route");
    next();
  },
  userRoutes
);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    userId: req.user?.id,
  });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log("Server running on port 5000")
  );
});
