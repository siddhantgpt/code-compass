import Problem from "../models/Problem";
import { IProblem } from "../models/Problem";
import { UserProgress } from "../models/UserProgress";
import { Topic, ITopic } from "../models/Topic";

export const getDashboardSummaryData = async (userId: string) => {
  const totalProblems = await Problem.countDocuments();
  const userProgress = await UserProgress.find({
    user: userId,
    completed: true,
  });

  const problemsCompleted = userProgress.length;

  const lastProgress = await UserProgress.findOne({
    user: userId,
    completed: true,
  })
    .sort({ updatedAt: -1 })
    .populate<{ problem: IProblem }>("problem");

  const lastProblem = lastProgress?.problem;
  const lastTopic = lastProblem?.topic
    ? await Topic.findById(lastProblem.topic)
    : null;

  const totalProblemsInTopic = lastTopic
    ? await Problem.countDocuments({ topic: lastTopic._id })
    : 0;
  const completedInTopic = lastTopic
    ? await UserProgress.countDocuments({
        user: userId,
        topic: lastTopic._id,
        completed: true,
      })
    : 0;

  const topics = await Topic.find();
  let topicsMastered = 0;
  const topicWiseCompletion = await Promise.all(
    topics.map(async (topic: ITopic) => {
      const total = await Problem.countDocuments({ topic: topic._id });
      const completed = await UserProgress.countDocuments({
        user: userId,
        topic: topic._id,
        completed: true,
      });
      if (completed > 0 && completed === total) topicsMastered++;
      return {
        topic: topic.title,
        completed,
        total,
      };
    })
  );

  return {
    problemsCompleted,
    totalProblems,
    topicsMastered,
    lastTopic: lastProblem?.title || null,
    lastTopicCategory: lastTopic?.title || null,
    lastTopicCompletionPercent:
      totalProblemsInTopic > 0
        ? Math.floor((completedInTopic / totalProblemsInTopic) * 100)
        : 0,
    topicWiseCompletion,
  };
};
