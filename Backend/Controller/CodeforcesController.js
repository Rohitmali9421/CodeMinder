import axios from "axios";

const CODEFORCES_URL = "https://codeforces.com/api";

// Fetch basic user info including rating and rank
const fetchCodeforcesUserInfo = async (username) => {
    const response = await axios.get(`${CODEFORCES_URL}/user.info?handles=${username}`);
    if (!response.data || response.data.status !== "OK") throw new Error("User not found");

    const user = response.data.result[0];
    return {
        rating: user.rating || 0, // Current rating
        maxRating: user.maxRating || 0, // Highest rating achieved
        rank: user.rank || "Unrated",
        maxRank: user.maxRank || "Unrated"
    };
};

// Fetch problem-solving stats categorized by difficulty
const fetchCodeforcesStats = async (username) => {
    const response = await axios.get(`${CODEFORCES_URL}/user.status?handle=${username}`);
    if (!response.data || response.data.status !== "OK") throw new Error("User not found");

    const solvedProblems = new Set();
    const difficultyStats = { Easy: 0, Medium: 0, Hard: 0 };

    response.data.result.forEach((submission) => {
        if (submission.verdict === "OK" && submission.problem && submission.problem.rating) {
            const problemId = submission.problem.contestId + "-" + submission.problem.index;
            if (!solvedProblems.has(problemId)) {
                solvedProblems.add(problemId);

                if (submission.problem.rating <= 1200) difficultyStats.Easy++;
                else if (submission.problem.rating <= 2000) difficultyStats.Medium++;
                else difficultyStats.Hard++;
            }
        }
    });

    return {
        username,
        stats: [
            { difficulty: "All", count: solvedProblems.size },
            { difficulty: "Easy", count: difficultyStats.Easy },
            { difficulty: "Medium", count: difficultyStats.Medium },
            { difficulty: "Hard", count: difficultyStats.Hard }
        ]
    };
};

// Fetch user submission history for heatmap
const fetchCodeforcesSubmissions = async (username) => {
    const response = await axios.get(`${CODEFORCES_URL}/user.status?handle=${username}`);
    if (!response.data || response.data.status !== "OK") throw new Error("User not found");

    const submissionCalendar = {};
    response.data.result.forEach((submission) => {
        if (submission.verdict === "OK") {
            const timestamp = Math.floor(submission.creationTimeSeconds / 86400) * 86400;
            submissionCalendar[timestamp] = (submissionCalendar[timestamp] || 0) + 1;
        }
    });
    return submissionCalendar;
};

// Fetch problems solved by topic/tags
const fetchCodeforcesProblemTags = async (username) => {
    const response = await axios.get(`${CODEFORCES_URL}/user.status?handle=${username}`);
    if (!response.data || response.data.status !== "OK") throw new Error("User not found");

    const topicWiseDistribution = {};
    response.data.result.forEach((submission) => {
        if (submission.verdict === "OK" && submission.problem.tags) {
            submission.problem.tags.forEach((tag) => {
                topicWiseDistribution[tag] = (topicWiseDistribution[tag] || 0) + 1;
            });
        }
    });
    return { topicWiseDistribution };
};



// Main API function to fetch all Codeforces data
const getAllCodeforcesData = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) return res.status(400).json({ error: "Username is required" });

        console.log(`🔹 Fetching Codeforces data for ${username}...`);

        // Fetch user rating, stats, submissions, topic analysis, and badges in parallel
        const [userInfo, stats, submissionCalendar, topicAnalysisStats] = await Promise.all([
            fetchCodeforcesUserInfo(username),
            fetchCodeforcesStats(username),
            fetchCodeforcesSubmissions(username),
            fetchCodeforcesProblemTags(username)
        ]);

        // Fetch awards based on rating

        console.log(`✅ Successfully fetched all Codeforces data for ${username}`);

        return res.status(200).json({
            username,
            rating: userInfo.rating,
            maxRating: userInfo.maxRating,
            rank: userInfo.rank,
            maxRank: userInfo.maxRank,
            stats: stats.stats,
            submissionCalendar,
            topicAnalysisStats,
            
        });
    } catch (error) {
        console.error("❌ Error fetching Codeforces data:", error.message);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export { getAllCodeforcesData };
