import { useEffect, useState } from "react";
import { getProblems, getProgress, updateProgress } from "../services/api";
import ProblemCard from "../components/ProblemCard";

interface TopicInfo {
  _id: string;
  title: string;
  category?: string;
}

interface Problem {
  _id: string;
  title: string;
  topic: TopicInfo;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const Topics = () => {
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [groupedProblems, setGroupedProblems] = useState<
    Record<string, Problem[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsData, progressData] = await Promise.all([
          getProblems(),
          getProgress(),
        ]);
        setProblems(problemsData);
        setCompletedProblems(progressData.completedProblems);

        const grouped = problemsData.reduce(
          (acc: Record<string, Problem[]>, problem: Problem) => {
            const topicTitle = problem.topic.title;
            if (!acc[topicTitle]) acc[topicTitle] = [];
            acc[topicTitle].push(problem);
            return acc;
          },
          {}
        );

        setGroupedProblems(grouped);
      } catch (err) {
        console.error(err);
        setError("Failed to load problems. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleProgress = async (problemId: string) => {
    try {
      const data = await updateProgress(problemId);
      setCompletedProblems(data.completedProblems);
    } catch (err) {
      console.error(err);
      setError("Failed to update progress.");
    }
  };

  if (loading) return <p>Loading problems...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-3">Topics</h1>
      <p className="text-gray-600 mb-8 text-sm">
        Explore these exciting topics!
      </p>
      <div className="space-y-6">
        {Object.entries(groupedProblems).map(([topicTitle, topicProblems]) => {
          const completedCount = topicProblems.filter((p) =>
            completedProblems.includes(p._id)
          ).length;
          const allCompleted = completedCount === topicProblems.length;

          return (
            <div
              key={topicTitle}
              className="border rounded-lg shadow-sm overflow-hidden bg-white"
            >
              <button
                onClick={() =>
                  setOpenTopic(openTopic === topicTitle ? null : topicTitle)
                }
                className="w-full flex justify-between items-center p-4 cursor-pointer select-none hover:bg-indigo-50 active:scale-[0.98] transition-all duration-200 ease-out"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-800">
                    {topicTitle}
                  </span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      openTopic === topicTitle ? "rotate-90" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                {allCompleted ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {completedCount}/{topicProblems.length} Completed
                    </span>
                    <div className="w-32 h-3 bg-gray-100 rounded-full">
                      <div
                        className="h-3 bg-indigo-600 rounded-full"
                        style={{
                          width: `${
                            (completedCount / topicProblems.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-400 ease-in ${
                  openTopic === topicTitle
                    ? "max-h-[1000px] p-4"
                    : "max-h-0 p-0"
                }`}
              >
                <div className="flex flex-wrap justify-center gap-6">
                  {topicProblems.map((problem) => (
                    <ProblemCard
                      key={problem._id}
                      problem={problem}
                      completedProblems={completedProblems}
                      onToggleProgress={handleToggleProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
