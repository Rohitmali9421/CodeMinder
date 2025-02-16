import React from "react";

const MySheets = () => {

    const sheets = [
        {
            title: "800-1299: A2OJ Ladder",
            link: "/question-tracker/sheet/800-1299-a2oj-ladder?category=popular",
            description:
                "This sheet is tailored for beginners, unrated users, or those looking to improve their problem-solving skills.",
            total: 100,
            solved: 0,
        },
        {
            title: "Striver SDE Sheet",
            link: "/question-tracker/sheet/striver-sde-sheet?category=popular",
            description:
                "SDE Sheet contains very handily crafted and picked top coding questions for interviews.",
            total: 191,
            solved: 0,
        },
    ];
    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900">My Sheets</h3>
            <p className="text-sm text-gray-600">
                Based on your personal and followed sheets
            </p>
            <div className="flex flex-col gap-4 ">
                {/* Followed Sheets */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h4 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                            Followed Sheets
                        </h4>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {sheets.map((sheet, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-between overflow-hidden bg-white border rounded-lg h-[160px] dark:bg-gray-800 dark:border-gray-700"
                            >
                                <a href={sheet.link}>
                                    <div className="cursor-pointer" title="0" style={{ width: "100%" }}>
                                        {/* Progress Bar */}
                                        <svg className="rc-progress-line" viewBox="0 0 100 6" preserveAspectRatio="none">
                                            <path
                                                className="rc-progress-line-trail"
                                                d="M 0,3 L 100,3"
                                                strokeLinecap="butt"
                                                stroke="#ffedd5"
                                                strokeWidth="6"
                                                fillOpacity="0"
                                            ></path>
                                            <path
                                                className="rc-progress-line-path"
                                                d="M 0,3 L 100,3"
                                                strokeLinecap="butt"
                                                stroke="#fb923c"
                                                strokeWidth="6"
                                                fillOpacity="0"
                                                style={{
                                                    strokeDasharray: "0px, 100px",
                                                    strokeDashoffset: "0px",
                                                    transition:
                                                        "stroke-dashoffset 0.3s, stroke-dasharray 0.3s, stroke 0.3s linear, 0.06s",
                                                }}
                                            ></path>
                                        </svg>
                                    </div>
                                </a>
                                <div className="flex flex-col gap-4 p-2">
                                    <a href={sheet.link} className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between w-full dark:text-gray-300">
                                            <h4 className="text-base font-medium truncate w-[85%] whitespace-nowrap">
                                                {sheet.title}
                                            </h4>
                                            <h2 className="dark:text-gray-300">0%</h2>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            <p className="inline mr-2">{sheet.description}</p>
                                            <span className="text-base text-gray-500 dark:text-gray-400">...</span>
                                        </div>
                                    </a>
                                    <div className="flex justify-between w-full text-sm">
                                        <div className="font-semibold text-gray-500 dark:text-gray-400">
                                            <span>Total: {sheet.total}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                                Solved: {sheet.solved}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="my-4">
                    <hr className="border-gray-300 dark:border-gray-700" />
                </div>

                {/* Custom Sheets */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full">
                        <h4 className="text-xl font-medium text-gray-600 dark:text-gray-300">Custom Sheets</h4>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        <div className="p-4 font-semibold text-gray-800 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                            <h3>No Sheets Found</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Get Started by creating a sheet
                            </p>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white rounded-lg shadow-sm bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Create Sheet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySheets;
