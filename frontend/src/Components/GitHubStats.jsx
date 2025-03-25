import { useState, useEffect } from "react";
import { FaStar, FaCodeBranch, FaExclamationCircle } from "react-icons/fa";
import { FaCodeCommit } from "react-icons/fa6";

const GITHUB_API_URL = "http://localhost:4000/api/github/Rohitmali9421/stats";

export default function GitHubStats() {
  const [stats, setStats] = useState({
    stars: 0,
    commits: 0,
    prs: 0,
    issues: 0,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const response = await fetch(GITHUB_API_URL);
        const data = await response.json();
        
        setStats({
          stars: data.stars || 0,
          commits: data.commits || 0,
          prs: data.pullRequests || 0,
          issues: data.issues || 0,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      }
    }

    fetchGitHubStats();
  }, []);

  return (
    <div className="p-4 w-full bg-white border rounded-lg shadow-sm">
      <h2 className="text-gray-500 text-lg font-semibold">GitHub Stats</h2>
      <div className="flex flex-col gap-3 mt-3">
        <StatItem icon={<FaStar className="text-yellow-400 w-6 h-6" />} name="Stars" value={stats.stars} />
        <StatItem icon={<FaCodeCommit className="text-orange-500 w-6 h-6" />} name="Commits" value={stats.commits} />
        <StatItem icon={<FaCodeBranch className="text-green-400 w-6 h-6" />} name="PRs" value={stats.prs} />
        <StatItem icon={<FaExclamationCircle className="text-red-500 w-6 h-6" />} name="Issues" value={stats.issues} />
      </div>
    </div>
  );
}

const StatItem = ({ icon, name, value }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 flex justify-center items-center">{icon}</div>
      <h3 className="text-gray-600 font-medium">{name}</h3>
    </div>
    <p className="font-semibold text-black">{value}</p>
  </div>
);
