import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { FaChevronUp, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { SiLeetcode, SiGithub, SiCodeforces, SiGeeksforgeeks } from "react-icons/si";

// Mapping for platform icons
const platformIcons = {
    leetcode: <SiLeetcode className="w-6 h-6 text-yellow-500" />,
    github: <SiGithub className="w-6 h-6 text-black dark:text-white" />,
    codeforces: <SiCodeforces className="w-6 h-6 text-blue-600" />,
    geeksforgeeks: <SiGeeksforgeeks className="w-6 h-6 text-green-500" />,
};

function ProfileTracker() {
    const [isOpen, setIsOpen] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handlePlatformClick = (platform, username) => {
        if (username) {
            navigate(`/profile/${platform}?user=${username}`);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 pt-20 bg-gray-100 gap-4 dark:bg-gray-900 min-h-screen p-4">
            {/* Sidebar */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center gap-6 rounded-lg md:rounded-r-lg w-full md:w-auto">

                {/* Profile Section */}
                <Card className="w-full p-6 flex flex-col items-center shadow-md rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <div className="relative">
                        <img
                            src={user?.profilePic?.url || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                            <FaEdit size={16} className="text-gray-700" />
                        </button>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">{user?.name || "User"}</h2>
                </Card>

                {/* Problem Solving & Development Section */}
                <Card className="w-full p-3 shadow-md bg-white dark:bg-gray-800 rounded-lg">
                    <div
                        className="flex items-center justify-between p-3 cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Button variant="ghost" className="w-full text-start font-semibold text-gray-800 dark:text-white">
                            Platforms
                        </Button>
                        <FaChevronUp className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>

                    {isOpen && (
                        <div className="mt-3 flex flex-col gap-3">
                            {Object.keys(user?.platforms || {})
                                .filter((platform) => user.platforms[platform]?.trim()) // Remove empty usernames
                                .map((platform) => (
                                    <Card
                                        key={platform}
                                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => handlePlatformClick(platform, user.platforms[platform])}
                                    >
                                        <div className="flex items-center gap-2">
                                            {platformIcons[platform] || null}
                                            <span className="font-semibold tracking-wide text-gray-800 dark:text-white capitalize">
                                                {platform}
                                            </span>
                                        </div>
                                        <FaExternalLinkAlt className="text-gray-500 w-5 h-5 hover:text-blue-500" />
                                    </Card>
                                ))}

                        </div>
                    )}
                </Card>
            </div>

            {/* Main Content */}
            <div className="col-span-3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full md:w-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default ProfileTracker;
