import { Request, Response } from "express";
import * as userProgressService from "../services/userProgressService";

export const getProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const completedProblems = await userProgressService.getCompletedProblems(
      userId
    );
    res.status(200).json({ completedProblems });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { problemId } = req.body;
    const updatedProgress = await userProgressService.toggleProblemProgress(
      userId,
      problemId
    );

    if (updatedProgress === null) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    res.status(200).json({ completedProblems: updatedProgress });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};
