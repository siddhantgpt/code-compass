import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const result = await authService.registerUser(email, password);
    res.status(201).json(result);
  } catch (err) {
    res
      .status(400)
      .json({
        message: err instanceof Error ? err.message : "Registration failed",
      });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(401)
      .json({ message: err instanceof Error ? err.message : "Login failed" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const result = await authService.changeUserPassword(
      userId,
      currentPassword,
      newPassword
    );
    res.status(200).json(result);
  } catch (err) {
    res
      .status(400)
      .json({
        message: err instanceof Error ? err.message : "Password update failed",
      });
  }
};
