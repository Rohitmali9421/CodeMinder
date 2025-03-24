import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    FaChevronUp, FaExclamationTriangle,
    FaExternalLinkAlt, FaCheckCircle, FaEdit
} from "react-icons/fa";
import { SiLeetcode, SiGithub } from "react-icons/si";

function ProfileTracker() {
    const [isProblemSolvingOpen, setIsProblemSolvingOpen] = useState(true);
    const [isDevelopmentOpen, setIsDevelopmentOpen] = useState(true);

    const leetCodeProfile = "https://leetcode.com/u/rohitsmali9421";
    const githubProfile = "https://github.com/Rohitmali9421";

    return (
        <div className="grid grid-cols-4  pt-20 bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center gap-6 rounded-r-lg">

                {/* Profile Section */}
                <Card className="w-full p-6 flex flex-col items-center shadow-md rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <div className="relative">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" // Replace with actual image URL
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                            <FaEdit size={16} className="text-gray-700" />
                        </button>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">Rohit Mali</h2>
                </Card>

                {/* Problem Solving Stats */}
                <Card className="w-full p-3 shadow-md bg-white dark:bg-gray-800 rounded-lg">
                    <div
                        className="flex items-center justify-between p-3 cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg"
                        onClick={() => setIsProblemSolvingOpen(!isProblemSolvingOpen)}
                    >
                        <Button variant="ghost" className="w-full text-start font-semibold text-gray-800 dark:text-white">
                            Problem Solving Stats
                        </Button>
                        <Button variant="ghost" size="icon">
                            <FaChevronUp className={`transition-transform ${isProblemSolvingOpen ? "rotate-180" : ""}`} />
                        </Button>
                    </div>
                    {isProblemSolvingOpen && (
                        <div className="mt-3 flex flex-col gap-2">
                            <Card className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow">
                                <div className="flex items-center gap-2">
                                    <SiLeetcode className="w-6 h-6 text-yellow-500" />
                                    <span className="font-semibold tracking-wide text-gray-800 dark:text-white">LeetCode</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaExclamationTriangle className="text-gray-400 w-5 h-5" />
                                    <a href={leetCodeProfile} target="_blank" rel="noopener noreferrer">
                                        <FaExternalLinkAlt className="text-gray-500 w-5 h-5 hover:text-blue-500" />
                                    </a>
                                </div>
                            </Card>
                        </div>
                    )}
                </Card>

                {/* Development Stats */}
                <Card className="w-full p-3 shadow-md bg-white dark:bg-gray-800 rounded-lg">
                    <div
                        className="flex items-center justify-between p-3 cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg"
                        onClick={() => setIsDevelopmentOpen(!isDevelopmentOpen)}
                    >
                        <Button variant="ghost" className="w-full text-start font-semibold text-gray-800 dark:text-white">
                            Development Stats
                        </Button>
                        <Button variant="ghost" size="icon">
                            <FaChevronUp className={`transition-transform ${isDevelopmentOpen ? "rotate-180" : ""}`} />
                        </Button>
                    </div>
                    {isDevelopmentOpen && (
                        <div className="mt-3 flex flex-col gap-2">
                            <Link to="devStats">
                                <Card className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow">
                                    <div className="flex items-center gap-2">
                                        <SiGithub className="w-6 h-6 text-black dark:text-white" />
                                        <span className="font-semibold tracking-wide text-gray-800 dark:text-white">GitHub</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCheckCircle className="text-green-500 w-5 h-5" />
                                        <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt className="text-gray-500 w-5 h-5 hover:text-blue-500" />
                                        </a>
                                    </div>
                                </Card>
                            </Link> 
                        </div>
                    )}
                </Card>
            </div>

            {/* Main Content */}
            <div className="col-span-3 p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default ProfileTracker;
