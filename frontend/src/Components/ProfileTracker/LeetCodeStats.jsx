import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DSATopicAnalysis from "./DSATopicAnalysis";
import Stats from "./Stats";
import { useSelector } from "react-redux";


const LeetCodeStats = () => {
    const [data, setData] = useState(null);
    const [heatmapData, setHeatmapData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [streak, setStreak] = useState({ maxStreak: 0, currentStreak: 0 });
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/leetcode/${user?.platforms.leetcode}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();

                setData(result);

                if (result.submissionCalendar) {
                    const formattedData = Object.entries(result.submissionCalendar).map(([timestamp, count]) => ({
                        date: new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0],
                        count,
                    }));

                    setHeatmapData(formattedData);
                    setTotalContributions(formattedData.reduce((sum, entry) => sum + entry.count, 0));

                    // Streak Calculation
                    calculateStreak(formattedData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to calculate max streak and current streak
    const calculateStreak = (formattedData) => {
        const streakData = formattedData.filter(entry => entry.count > 0).map(entry => entry.date).sort();
        let maxStreak = 0, currentStreak = 0, tempStreak = 0;
        const today = new Date().toISOString().split("T")[0];

        for (let i = 0; i < streakData.length; i++) {
            if (i === 0 || new Date(streakData[i]) - new Date(streakData[i - 1]) === 86400000) {
                tempStreak++; // Consecutive day
            } else {
                maxStreak = Math.max(maxStreak, tempStreak);
                tempStreak = 1; // Reset streak
            }
            if (streakData[i] === today) currentStreak = tempStreak; // Active streak till today
        }
        maxStreak = Math.max(maxStreak, tempStreak);

        setStreak({ maxStreak, currentStreak });
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid w-full gap-4 lg:grid-cols-5">
                <div className="col-span-2 grid md:grid-cols-2 gap-4">
                    <StatCard title="Total Questions" value={data?.stats?.find(stat => stat.difficulty === "All")?.count || 0} />
                    <StatCard title="Total Active Days" value={heatmapData.length} />
                </div>
                <div className="p-4 w-full bg-white border rounded-lg shadow-sm lg:col-span-3">
                    
                    <div className=" flex justify-center">
                        <div className="p-4 border rounded-lg shadow-sm bg-gray-50 w-full">
                            <CalendarHeatmap
                                startDate={new Date(new Date().setDate(new Date().getDate() - 365))}
                                endDate={new Date()}
                                values={heatmapData}
                                classForValue={(value) => {
                                    if (!value || value.count === 0) return "fill-gray-200";
                                    if (value.count === 1) return "fill-green-300";
                                    if (value.count === 2) return "fill-green-400";
                                    if (value.count === 3) return "fill-green-500";
                                    if (value.count === 4) return "fill-green-600";
                                    if (value.count === 5) return "fill-green-700";
                                    if (value.count === 6) return "fill-green-800";
                                    return "fill-green-900";
                                }}
                                gutterSize={4}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <AwardsSection badges={data?.awards} showMore={showMore} setShowMore={setShowMore} />
                <div >
                    <Stats data={data?.stats} />
                </div>
            </div>
            <DSATopicAnalysis topicData={data?.topicAnalysisStats.topicWiseDistribution || []} />
        </div>
    );
};

// Component for displaying statistics
const StatCard = ({ title, value }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg shadow-sm">
        <div className="font-semibold text-gray-500">{title}</div>
        <span className="text-5xl font-extrabold">{value}</span>
    </div>
);

// Component for displaying awards
const AwardsSection = ({ badges, showMore, setShowMore }) => (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-500">Awards</h3>
            <span className="text-sm font-bold text-gray-400">{badges?.length || 0}</span>
        </div>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
            {badges?.length > 0 ? (
                badges.map((badge, index) => (
                    <img
                        key={index}
                        src={badge.icon}
                        className="w-20 h-20"
                        alt={badge.name}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/80")}
                    />
                ))
            ) : (
                <p className="text-gray-500 text-center mt-2">No awards yet</p>
            )}
        </div>
        {badges?.length > 3 && (
            <div className="flex flex-col mt-2 text-sm text-center text-gray-500">
                {showMore && <span>Additional badges or details...</span>}
                <button
                    className="flex items-center justify-center gap-1 text-blue-500 font-semibold hover:underline"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? "Show less" : "Show more"} {showMore ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
        )}
    </div>
);

export default LeetCodeStats;
