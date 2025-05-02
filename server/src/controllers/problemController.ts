import { Request, Response } from "express";
import * as problemService from "../services/problemService";

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const problems = await problemService.fetchAllProblems();
    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ message: "Server error" });
  }
};
