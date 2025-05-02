import { FC, useState, useEffect } from "react";
import {
  BookOpenIcon,
  PlayIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

interface Topic {
  _id: string;
  title: string;
  category?: string;
}

interface Problem {
  _id: string;
  title: string;
  topic: Topic;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface ProblemCardProps {
  problem: Problem;
  completedProblems: string[];
  onToggleProgress: (problemId: string) => void;
}

const ProblemCard: FC<ProblemCardProps> = ({
  problem,
  completedProblems,
  onToggleProgress,
}) => {
  const isCompleted = completedProblems.includes(problem._id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleConfirm = () => {
    onToggleProgress(problem._id);
    setAnimateOut(true);
    setTimeout(() => setIsModalOpen(false), 150);
  };

  const handleCancel = () => {
    setAnimateOut(true);
    setTimeout(() => setIsModalOpen(false), 150);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };
    if (isModalOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <>
      <div className="relative w-full sm:w-[320px] md:w-[30%] p-6 rounded-2xl shadow-lg bg-white flex flex-col justify-between min-h-[140px] hover:shadow-2xl hover:-translate-y-1 hover:border hover:border-indigo-300 transition-transform duration-300 hover:bg-gray-50">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <button
              onClick={() => {
                setAnimateOut(false);
                setIsModalOpen(true);
              }}
              className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                isCompleted
                  ? "bg-green-100 border-green-500"
                  : "border-gray-300"
              }`}
            >
              {isCompleted && (
                <svg
                  className="w-3.5 h-3.5 text-green-600"
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
              )}
            </button>
            <h3 className="text-base font-semibold text-gray-800 break-words">
              {problem.title}
            </h3>
          </div>
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${
              problem.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : problem.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="flex justify-between gap-2 mt-3">
          <a
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold border rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition"
          >
            <PencilSquareIcon className="w-4 h-4" /> Practice
          </a>
          <a
            href={problem.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold border rounded-md text-gray-700 hover:bg-red-100 hover:text-red-700 transition"
          >
            <PlayIcon className="w-4 h-4" /> Watch
          </a>
          <a
            href={problem.articleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold border rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
          >
            <BookOpenIcon className="w-4 h-4" /> Read
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div
            className={`bg-white rounded-xl p-6 max-w-sm w-full shadow-xl transform transition-all duration-150 ${
              animateOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isCompleted ? "Mark as Not Done" : "Mark as Done"}?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to {isCompleted ? "unmark" : "mark"} "
              {problem.title}"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-1.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemCard;
