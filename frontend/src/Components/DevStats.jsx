import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import LanguageProficiencyChart from "./LanguageProficiencyChart";
import GitHubStats from "./GitHubStats";

const API_URL = "http://localhost:4000/api/github/Rohitmali9421/contributions";

function DevStats() {
    const [heatmapData, setHeatmapData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [streak, setStreak] = useState({ maxStreak: 0, currentStreak: 0 });

    useEffect(() => {
        async function fetchGitHubContributions() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch data");
                
                const data = await response.json();
                setTotalContributions(data.totalContributions);

                // Format heatmap data for CalendarHeatmap
                const formattedData = data.heatmap.map(entry => ({
                    date: entry.date,
                    count: entry.contributionCount,
                }));

                setHeatmapData(formattedData);
                calculateStreak(formattedData);
            } catch (error) {
                console.error("Failed to fetch contributions:", error);
            }
        }

        fetchGitHubContributions();
    }, []);

    function calculateStreak(contributions) {
        let maxStreak = 0, currentStreak = 0, streakCounter = 0;
        let previousDate = null;

        for (let i = contributions.length - 1; i >= 0; i--) {
            if (contributions[i].count > 0) {
                streakCounter++;
                maxStreak = Math.max(maxStreak, streakCounter);
                
                const currentDate = new Date(contributions[i].date);
                if (!previousDate || (currentDate - new Date(previousDate) === 86400000)) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
                previousDate = contributions[i].date;
            } else {
                streakCounter = 0;
            }
        }

        setStreak({ maxStreak, currentStreak });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="lg:grid w-full gap-4 lg:space-y-0 space-y-4 lg:grid-cols-5">
                <div className="col-span-2 grid md:grid-cols-2 gap-4">
                    {/* Total Contributions */}
                    <div className="relative flex flex-col items-center justify-center w-full h-full gap-2 p-4 bg-white border rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-500">Total Contributions</div>
                        <span className="text-5xl font-extrabold">{totalContributions}</span>
                    </div>

                    {/* Total Active Days */}
                    <div className="relative flex flex-col items-center justify-center w-full h-full gap-2 p-4 bg-white border rounded-lg shadow-sm">
                        <div className="font-semibold text-gray-500">Total Active Days</div>
                        <span className="text-5xl font-extrabold">{heatmapData.length}</span>
                    </div>
                </div>

                <div className="px-4 w-full bg-white h-full pt-4 relative border rounded-lg shadow-sm lg:col-span-3 md:px-4">
                    <div className="flex flex-col items-center justify-between w-full gap-2 sm:flex-row sm:gap-4">
                        <div className="flex items-center gap-4 justify-between w-full lg:w-auto">
                            <div className="whitespace-nowrap">
                                <p className="text-xs font-semibold text-black">
                                    <span>{totalContributions} </span>
                                    <span className="text-gray-500">contributions</span>
                                </p>
                            </div>
                            <div className="flex gap-1 text-center">
                                <span className="text-xs font-semibold text-gray-500">Max. Streak</span>
                                <span className="text-xs font-extrabold">{streak.maxStreak}</span>
                            </div>
                            <div className="flex gap-1 text-center">
                                <span className="text-xs font-semibold text-gray-500">Current Streak</span>
                                <span className="text-xs font-extrabold">{streak.currentStreak}</span>
                            </div>
                        </div>
                    </div>

                    {/* Heatmap Container */}
                    <div className="mt-6 flex justify-center">
                        <div className="p-4 border rounded-lg shadow-sm bg-gray-50 w-full overflow-hidden">
                            <CalendarHeatmap
                                startDate={new Date(new Date().setDate(new Date().getDate() - 365))}
                                endDate={new Date()}
                                values={heatmapData}
                                classForValue={(value) => {
                                    if (!value || value.count === 0) return "fill-gray-200"; // No contribution (gray)
                                    if (value.count === 1) return "fill-green-300";
                                    if (value.count === 2) return "fill-green-300";
                                    if (value.count === 3) return "fill-green-500";
                                    if (value.count === 4) return "fill-green-700";
                                    return "fill-green-900"; // 5+ contributions
                                }}
                                
                                gutterSize={4}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
                <LanguageProficiencyChart />
                <GitHubStats />
            </div>
        </div>
    );
}

export default DevStats;
