import axios from "axios";
import { request, gql } from "graphql-request";

// GitHub API URLs
const GITHUB_API_URL = "https://api.github.com";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

// GitHub Token (Set in .env file)
const TOKEN =
  "";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "User-Agent": "Node.js",
};

// 📌 Fetch user profile & basic stats
const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch user profile
    const { data } = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers,
    });

    // Fetch user's repositories
    const repos = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      headers,
    });

    // Calculate language usage
    const languages = {};
    let totalSize = 0;

    for (const repo of repos.data) {
      if (repo.language) {
        const size = repo.size;
        totalSize += size;
        languages[repo.language] = (languages[repo.language] || 0) + size;
      }
    }

    const languageStats = Object.entries(languages).map(([lang, size]) => ({
      language: lang,
      percentage: ((size / totalSize) * 100).toFixed(2),
    }));

    return res.json({
      username: data.login,
      avatar: data.avatar_url,
      profileUrl: data.html_url,
      totalRepos: repos.data.length,
      followers: data.followers,
      following: data.following,
      languages: languageStats,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 📌 Fetch contributions & heatmap data
const getContributions = async (req, res) => {
  try {
    const username = req.params.username;
    const query = gql`
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
            contributionYears
            totalCommitContributions
          }
        }
      }
    `;

    const result = await request(GITHUB_GRAPHQL_URL, query, {}, headers);

    const heatmap =
      result.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) => week.contributionDays
      );

    return res.json({
      totalContributions:
        result.user.contributionsCollection.totalCommitContributions,
      heatmap,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 📌 Fetch PRs, Stars, Issues
const getStats = async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch Pull Requests
    const { data: prData } = await axios.get(
      `${GITHUB_API_URL}/search/issues?q=author:${username}+is:pr`,
      { headers }
    );

    // Fetch Issues
    const { data: issueData } = await axios.get(
      `${GITHUB_API_URL}/search/issues?q=author:${username}+is:issue`,
      { headers }
    );

    // Fetch user's starred repositories
    const { data: starsData } = await axios.get(
      `${GITHUB_API_URL}/users/${username}/starred`,
      { headers }
    );

    // Fetch total commits
    const getTotalCommits = async () => {
      try {
        const repos = await axios.get(
          `${GITHUB_API_URL}/users/${username}/repos`,
          { headers }
        );

        let totalCommits = 0;
        for (const repo of repos.data.slice(0, 5)) {
          // Limit to 5 repos to avoid rate limits
          const { data: commits } = await axios.get(
            repo.commits_url.replace("{/sha}", ""),
            { headers }
          );
          totalCommits += commits?.length || 0;
        }
        return totalCommits;
      } catch (error) {
        return 0;
      }
    };

    return res.json({
      stars: starsData?.length || 0,
      commits: await getTotalCommits(),
      pullRequests: prData?.total_count || 0,
      issues: issueData?.total_count || 0,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export { getStats, getContributions, getUserProfile };
