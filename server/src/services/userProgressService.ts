import { UserProgress } from "../models/UserProgress";
import Problem from "../models/Problem";
import mongoose from "mongoose";

export const getCompletedProblems = async (userId: string) => {
  const userProgress = await UserProgress.find({
    user: userId,
    completed: true,
  })
    .select("problem")
    .lean();

  return userProgress.map((entry) => entry.problem);
};

export const toggleProblemProgress = async (
  userId: string,
  problemId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(problemId)) return null;

  const problem = await Problem.findById(problemId);
  if (!problem) return null;

  const existing = await UserProgress.findOne({
    user: userId,
    problem: problemId,
  });

  if (existing) {
    await existing.deleteOne();
  } else {
    await UserProgress.create({
      user: userId,
      topic: problem.topic,
      problem: problem._id,
      completed: true,
    });
  }

  const progress = await UserProgress.find({
    user: userId,
    completed: true,
  }).select("problem");

  return progress.map((entry) => entry.problem);
};
