import axios from "axios";

// Base URL and Headers for LeetCode API
const LEETCODE_URL = "https://leetcode.com/graphql";
const HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://leetcode.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Function to fetch submission stats
const fetchLeetCodeStats = async (username) => {
  const data = {
    query: `query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }`,
    variables: { username },
  };

  const response = await axios.post(LEETCODE_URL, data, { headers: HEADERS });

  if (!response.data?.data?.matchedUser) throw new Error("User not found");

  return response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;
};

// Function to fetch submission calendar
const fetchSubmissionCalendar = async (username) => {
  const data = {
    query: `query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submissionCalendar
      }
    }`,
    variables: { username },
  };

  const response = await axios.post(LEETCODE_URL, data, { headers: HEADERS });

  if (!response.data?.data?.matchedUser) throw new Error("User not found");

  return JSON.parse(response.data.data.matchedUser.submissionCalendar);
};

// Function to fetch topic-wise stats
const fetchLeetCodeTopics = async (username) => {
  const data = {
    query: `query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        tagProblemCounts {
          advanced { tagName problemsSolved }
          intermediate { tagName problemsSolved }
          fundamental { tagName problemsSolved }
        }
      }
    }`,
    variables: { username },
  };

  const response = await axios.post(LEETCODE_URL, data, { headers: HEADERS });

  if (!response.data?.data?.matchedUser) throw new Error("User not found");

  const { advanced, intermediate, fundamental } =
    response.data.data.matchedUser.tagProblemCounts;

  // Aggregate problems solved per topic
  const topicWiseDistribution = [...advanced, ...intermediate, ...fundamental].reduce((acc, topic) => {
    acc[topic.tagName] = (acc[topic.tagName] || 0) + topic.problemsSolved;
    return acc;
  }, {});

  return topicWiseDistribution;
};

// Function to fetch awards (badges)
const fetchLeetCodeAwards = async (username) => {
  const data = {
    query: `query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        badges {
          id
          displayName
          icon
        }
      }
    }`,
    variables: { username },
  };

  const response = await axios.post(LEETCODE_URL, data, { headers: HEADERS });

  if (!response.data?.data?.matchedUser) throw new Error("User not found");

  return response.data.data.matchedUser.badges.map((badge) => ({
    id: badge.id,
    name: badge.displayName,
    icon: badge.icon,
  }));
};

// Controller to fetch all LeetCode stats in one request
const getAllLeetCodeData = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) return res.status(400).json({ error: "Username is required" });

    console.log(`🔹 Fetching LeetCode data for ${username}...`);

    const [stats, submissionCalendar, topicWiseDistribution, awards] = await Promise.all([
      fetchLeetCodeStats(username),
      fetchSubmissionCalendar(username),
      fetchLeetCodeTopics(username),
      fetchLeetCodeAwards(username),
    ]);

    console.log(`✅ Successfully fetched all LeetCode data for ${username}`);

    return res.status(200).json({
      username,
      stats,
      submissionCalendar,
      topicAnalysisStats: { topicWiseDistribution },
      awards,
    });
  } catch (error) {
    console.error("❌ Error fetching LeetCode data:", error.message);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export { getAllLeetCodeData };
