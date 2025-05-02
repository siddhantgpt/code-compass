import { Request, Response } from "express";
import * as dashboardService from "../services/dashboardService";

export const getDashboardSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = await dashboardService.getDashboardSummaryData(req.user.id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
