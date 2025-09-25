import axios from "axios";
import { request, gql } from "graphql-request";
import dotenv from "dotenv";
import User from "../Model/User.js";
import GitHubData from "../Model/GitHubData.js";

dotenv.config();

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "User-Agent": "Node.js",
};

const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

const getGitHubUserData = async (req, res) => {
  try {
    const userId = req.user?.id;
    const refresh = req.query.refresh === "true";

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const username = user.platforms?.github;
    if (!username) return res.status(400).json({ error: "GitHub username not linked" });

    // Check cached data
    const existingData = await GitHubData.findOne({ userId });
    const isDataValid =
      existingData &&
      !refresh &&
      Date.now() - new Date(existingData.lastUpdated).getTime() < CACHE_DURATION;

    if (isDataValid) {
      return res.status(200).json(existingData.data);
    }

    console.log(`Refreshing GitHub data for ${username}...`);

    // REST API Requests
    const [repos, prData, issuesData, starsData] = await Promise.all([
      axios.get(`${GITHUB_API_URL}/users/${username}/repos?per_page=100`, { headers }),
      axios.get(`${GITHUB_API_URL}/search/issues?q=author:${username}+is:pr`, { headers }),
      axios.get(`${GITHUB_API_URL}/search/issues?q=author:${username}+is:issue`, { headers }),
      axios.get(`${GITHUB_API_URL}/users/${username}/starred`, { headers }),
    ]);

    // GraphQL Query
    const graphqlQuery = gql`
      query {
        user(login: "${username}") {
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const graphqlData = await request(GITHUB_GRAPHQL_URL, graphqlQuery, {}, headers);

    // Language Usage Stats
    const languages = repos.data.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + repo.size;
      }
      return acc;
    }, {});

    const totalSize = Object.values(languages).reduce((sum, size) => sum + size, 0);

    const languageStats = Object.entries(languages).map(([lang, size]) => ({
      language: lang,
      percentage: ((size / totalSize) * 100).toFixed(2),
    }));

    // Heatmap + Active Days
    const heatmap = graphqlData.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );
    const activeDays = heatmap.filter((day) => day.contributionCount > 0).length;

    // GitHub Data
    const githubData = {
      username,
      languages: languageStats,
      stats: {
        stars: starsData.data.length || 0,
        commits: graphqlData.user.contributionsCollection.totalCommitContributions,
        pullRequests: prData.data.total_count || 0,
        issues: issuesData.data.total_count || 0,
      },
      totalContributions: graphqlData.user.contributionsCollection.totalCommitContributions,
      activeDays,
      heatmap,
    };

    // Save to DB
    await GitHubData.findOneAndUpdate(
      { userId },
      { data: githubData, lastUpdated: new Date() },
      { upsert: true }
    );

    return res.status(200).json(githubData);
  } catch (error) {
    console.error("GitHub Data Fetch Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
};

export { getGitHubUserData };
