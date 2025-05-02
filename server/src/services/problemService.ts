import Problem from "../models/Problem";

export const fetchAllProblems = async () => {
  return await Problem.find().populate("topic");
};
