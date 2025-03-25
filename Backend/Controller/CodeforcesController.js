import axios from "axios";

const CODEFORCES_URL = "https://codeforces.com/api";

const fetchCodeforcesStats = async (username) => {
    const response = await axios.get(`${CODEFORCES_URL}/user.status?handle=${username}`);
    if (!response.data || response.data.status !== "OK") throw new Error("User not found");

    const solvedProblems = new Set(); // To store unique solved problems
    const difficultyStats = { Easy: 0, Medium: 0, Hard: 0 };

    response.data.result.forEach((submission) => {
        if (submission.verdict === "OK" && submission.problem && submission.problem.rating) {
            const problemId = submission.problem.contestId + "-" + submission.problem.index;
            if (!solvedProblems.has(problemId)) {
                solvedProblems.add(problemId);

                // Categorize problem by difficulty
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

const fetchCodeforcesBadges = async (username) => {
    // Codeforces does not provide a direct badge API, but you can add dynamic achievements
    return [
        {
            id: "codeforces_achievement_2025",
            name: "Active Coder 2025",
            icon: "https://codeforces.org/images/codeforces-icon.png"
        }
    ];
};

const getAllCodeforcesData = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) return res.status(400).json({ error: "Username is required" });

        console.log(`🔹 Fetching Codeforces data for ${username}...`);

        const [stats, submissionCalendar, topicAnalysisStats, awards] = await Promise.all([
            fetchCodeforcesStats(username),
            fetchCodeforcesSubmissions(username),
            fetchCodeforcesProblemTags(username),
            fetchCodeforcesBadges(username)
        ]);

        console.log(`✅ Successfully fetched all Codeforces data for ${username}`);

        return res.status(200).json({
            username,
            stats: stats.stats,
            submissionCalendar,
            topicAnalysisStats,
            awards
        });
    } catch (error) {
        console.error("❌ Error fetching Codeforces data:", error.message);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export { getAllCodeforcesData };
