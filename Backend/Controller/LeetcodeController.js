// controllers/leetcodeController.js

import axios from "axios";
import User from "../Model/User.js";
import LeetCodeData from "../Model/LeetCodeData.js";

const LEETCODE_URL = "https://leetcode.com/graphql";
const HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://leetcode.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// 🔹 Generic LeetCode GraphQL request
const leetCodeRequest = async (query, variables) => {
  const response = await axios.post(
    LEETCODE_URL,
    { query, variables },
    { headers: HEADERS }
  );

  if (!response.data?.data?.matchedUser) {
    throw new Error("User not found on LeetCode");
  }

  return response.data.data.matchedUser;
};

// 🔹 Fetch stats
const fetchLeetCodeStats = async (username) => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }`;
  const data = await leetCodeRequest(query, { username });
  return data.submitStatsGlobal.acSubmissionNum;
};

// 🔹 Fetch submission calendar
const fetchSubmissionCalendar = async (username) => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submissionCalendar
      }
    }`;
  const data = await leetCodeRequest(query, { username });
  return JSON.parse(data.submissionCalendar);
};

// 🔹 Fetch topic distribution
const fetchLeetCodeTopics = async (username) => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced { tagName problemsSolved }
          intermediate { tagName problemsSolved }
          fundamental { tagName problemsSolved }
        }
      }
    }`;
  const data = await leetCodeRequest(query, { username });
  const { advanced, intermediate, fundamental } = data.tagProblemCounts;

  return [...advanced, ...intermediate, ...fundamental].reduce((acc, t) => {
    acc[t.tagName] = (acc[t.tagName] || 0) + t.problemsSolved;
    return acc;
  }, {});
};

// 🔹 Fetch awards
const fetchLeetCodeAwards = async (username) => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        badges {
          id
          displayName
          icon
        }
      }
    }`;
  const data = await leetCodeRequest(query, { username });
  return data.badges.map((b) => ({
    id: b.id,
    name: b.displayName,
    icon: b.icon,
  }));
};

// 🔹 Controller
const getAllLeetCodeData = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const user = await User.findById(userId);
    const username = user?.platforms?.leetcode;
    if (!username)
      return res
        .status(404)
        .json({ error: "LeetCode username not found for this user" });

    const refresh = req.query.refresh === "true";
    let profile = await LeetCodeData.findOne({ username });

    const oneDayOld =
      profile && Date.now() - profile.lastUpdated > 24 * 60 * 60 * 1000;

    if (!profile || refresh || oneDayOld) {
      console.log(`Fetching fresh LeetCode data for ${username}...`);

      const [stats, submissionCalendar, topicWiseDistribution, awards] =
        await Promise.all([
          fetchLeetCodeStats(username),
          fetchSubmissionCalendar(username),
          fetchLeetCodeTopics(username),
          fetchLeetCodeAwards(username),
        ]);

      const newData = {
        userId,
        username,
        stats,
        submissionCalendar,
        topicAnalysisStats: { topicWiseDistribution },
        awards,
        lastUpdated: new Date(),
      };

      profile = profile
        ? Object.assign(profile, newData)
        : new LeetCodeData(newData);

      await profile.save();
    } else {
      console.log(`Returning cached LeetCode data for ${username}`);
    }

    return res.status(200).json({
      username: profile.username,
      stats: profile.stats,
      submissionCalendar: profile.submissionCalendar,
      topicAnalysisStats: profile.topicAnalysisStats,
      awards: profile.awards,
      lastUpdated: profile.lastUpdated,
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

export { getAllLeetCodeData };
