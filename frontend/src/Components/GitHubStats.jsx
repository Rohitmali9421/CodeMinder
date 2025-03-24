import { useState, useEffect } from "react";
import { FaStar, FaCodeBranch, FaExclamationCircle } from "react-icons/fa";
import { FaCodeCommit } from "react-icons/fa6";

const GITHUB_USERNAME = "Rohitmali9421"; // Replace with your GitHub username

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
        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const reposData = await reposRes.json();
        if (!Array.isArray(reposData)) throw new Error("Invalid repositories data");

        // Calculate total stars
        const totalStars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

        // Fetch total PRs
        const prsRes = await fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+is:pr`);
        const prsData = await prsRes.json();
        const totalPRs = prsData?.total_count || 0;

        // Fetch total issues
        const issuesRes = await fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+is:issue`);
        const issuesData = await issuesRes.json();
        const totalIssues = issuesData?.total_count || 0;

        // Fetch commits using public events
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
        const eventsData = await eventsRes.json();
        if (!Array.isArray(eventsData)) throw new Error("Invalid events data");

        // Count the number of PushEvents (commits)
        const totalCommits = eventsData.filter(event => event.type === "PushEvent")
          .reduce((sum, event) => sum + (event.payload?.size || 0), 0);

        // Update state
        setStats({
          stars: totalStars,
          commits: totalCommits,
          prs: totalPRs,
          issues: totalIssues,
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
