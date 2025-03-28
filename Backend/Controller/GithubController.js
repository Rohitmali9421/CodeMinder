import axios from "axios";
import { request, gql } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();

// GitHub API URLs
const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

// GitHub Token (Set in .env file)
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "User-Agent": "Node.js",
};

// 📌 Fetch all GitHub user data in a single function
const getGitHubUserData = async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch user profile
    const userProfilePromise = axios.get(`${GITHUB_API_URL}/users/${username}`, { headers });

    // Fetch user repositories
    const reposPromise = axios.get(`${GITHUB_API_URL}/users/${username}/repos?per_page=100`, { headers });

    // Fetch pull requests
    const prPromise = axios.get(`${GITHUB_API_URL}/search/issues?q=author:${username}+is:pr`, { headers });

    // Fetch issues
    const issuesPromise = axios.get(`${GITHUB_API_URL}/search/issues?q=author:${username}+is:issue`, { headers });

    // Fetch starred repositories
    const starsPromise = axios.get(`${GITHUB_API_URL}/users/${username}/starred`, { headers });

    // Fetch contribution heatmap and commits using GraphQL
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
          repositories(first: 100, isFork: false) {
            nodes {
              name
              isFork
              defaultBranchRef {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const graphqlPromise = request(GITHUB_GRAPHQL_URL, graphqlQuery, {}, headers);

    // Await all promises in parallel
    const [userProfile, repos, prData, issuesData, starsData, graphqlData] = await Promise.all([
      userProfilePromise,
      reposPromise,
      prPromise,
      issuesPromise,
      starsPromise,
      graphqlPromise,
    ]);

    // Process language usage from repositories
    const languages = {};
    let totalSize = 0;
    repos.data.forEach((repo) => {
      if (repo.language) {
        const size = repo.size;
        totalSize += size;
        languages[repo.language] = (languages[repo.language] || 0) + size;
      }
    });

    const languageStats = Object.entries(languages).map(([lang, size]) => ({
      language: lang,
      percentage: ((size / totalSize) * 100).toFixed(2),
    }));

    // Process contribution heatmap
    const heatmap = graphqlData.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays
    );

    // 🔥 **Fixed Commit Calculation**
    let totalCommits = graphqlData.user.contributionsCollection.totalCommitContributions;

    // Add commit counts from repositories (excluding forks)
    graphqlData.user.repositories.nodes.forEach((repo) => {
      if (!repo.isFork && repo.defaultBranchRef?.target?.history?.totalCount) {
        totalCommits += repo.defaultBranchRef.target.history.totalCount;
      }
    });

    // Construct final response
    return res.json({
      username: userProfile.data.login,
      languages: languageStats,
      stats: {
        stars: starsData.data.length || 0,
        commits: totalCommits, // ✅ Corrected Commit Count
        pullRequests: prData.data.total_count || 0,
        issues: issuesData.data.total_count || 0,
      },
      totalContributions: totalCommits,
      heatmap,
    });
  } catch (error) {
    console.error("GitHub Data Fetch Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { getGitHubUserData };
