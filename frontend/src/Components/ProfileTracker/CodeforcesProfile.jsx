import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import DSATopicAnalysis from "./DSATopicAnalysis";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import States from "./Stats";

const CodeforcesProfile = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("user");
    const [data, setData] = useState(null);
    const [heatmapData, setHeatmapData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [streak, setStreak] = useState({ maxStreak: 0, currentStreak: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/codeforces/${username}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();

                setData(result);

                if (result?.submissionCalendar) {
                    const formattedData = Object.entries(result.submissionCalendar).map(([timestamp, count]) => ({
                        date: new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0],
                        count,
                    }));
                    setHeatmapData(formattedData);
                    setTotalContributions(formattedData.reduce((sum, entry) => sum + entry.count, 0));
                }

                setStreak({
                    maxStreak: result?.maxStreak || 0,
                    currentStreak: result?.currentStreak || 0,
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-4">
            {/* Main Grid */}
            <div className="lg:grid w-full gap-4 lg:grid-cols-5 space-y-4 lg:space-y-0">
                {/* Stats Section */}
                <div className="col-span-2 grid md:grid-cols-2 gap-4">
                    <StatCard title="Total Questions" value={data?.stats?.[0]?.count || 0} />
                    <StatCard title="Total Active Days" value={heatmapData.length} />
                </div>

                {/* Heatmap & Streak Stats */}
                <div className="w-full bg-white h-full  border rounded-lg shadow-sm lg:col-span-3 p-4 ">
                    
                    {/* Heatmap */}
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
                                    if (value.count === 4) return "fill-green-700";
                                    return "fill-green-900";
                                }}
                                gutterSize={4}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Awards & DSA Stats */}
            <div className="grid grid-cols-2 w-full gap-4">
                <Card className="flex-1 p-4 bg-white border shadow-sm">
                    <h2 className="text-lg font-semibold text-center text-gray-500">Contest Ratings</h2>
                    <CardContent className="flex flex-col gap-4 mt-4">
                        <div className="flex-1 flex justify-center">
                            <img
                                alt="Codeforces Badge"
                                loading="lazy"
                                width="100"
                                height="100"
                                className="mx-auto"
                                src="https://codolio.com/landing/codeforces_user_icon.png"
                            />
                        </div>
                        <div className="flex flex-col items-center flex-1 p-2">
                            <h3 className="text-4xl font-bold">{data?.rating}</h3>
                            <div className="flex flex-col text-sm text-center">
                                <span className="text-sm">({data?.maxRating})</span>
                                <span className="capitalize">{data?.rank}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <States data={data?.stats} />
                </div>
            </div>

            <div>
                <DSATopicAnalysis topicData={data?.topicAnalysisStats?.topicWiseDistribution || []} />
            </div>
        </div>
    );
};

// Reusable StatCard Component
const StatCard = ({ title, value }) => (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 p-4 bg-white border rounded-lg shadow-sm">
        <div className="font-semibold text-gray-500">{title}</div>
        <span className="text-5xl font-extrabold">{value}</span>
    </div>
);

export default CodeforcesProfile;
