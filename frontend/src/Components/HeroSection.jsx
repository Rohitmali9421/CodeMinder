const HeroSection = () => {
    return (
        <section className="flex flex-col gap-4 items-center pt-14 text-center">
            {/* Hidden Accessibility Text */}
            <span className="sr-only">Track, analyze & share</span>

            {/* Heading */}
            <div className="flex flex-wrap justify-center  gap-1 sm:gap-5 mx-auto text-center">
                <span className="text-[2.75rem] leading-10 md:leading-normal dark:text-white font-semibold md:text-6xl">
                    Track,
                </span>
                <span className="text-[2.75rem] leading-10 md:leading-normal dark:text-white font-semibold md:text-6xl">
                    analyze
                </span>
                <span className="text-[2.75rem] leading-10 md:leading-normal dark:text-white font-semibold md:text-6xl">
                    & share
                </span>
            </div>

            {/* Subtitle */}
            <div className="font-[550] text-gray-500 dark:text-gray-400 md:text-3xl">
                <p>
                    <span className="dark:text-black">Code</span>
                    <span className="text-blue-600">Minder </span>
                    helps you navigate and track your <br /> coding journey to success
                </p>
            </div>

            {/* Buttons */}
            <div className="min-h-10">
                <div className="grid grid-cols-2 gap-2 mx-auto w-fit">
                    <a
                        href="/question-tracker"
                        className="p-2 rounded border-2 border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 text-center hover:bg-gray-50 dark:hover:bg-gray-800 "
                    >
                        Question Tracker
                    </a>
                    <a
                        href="/profile/Rohitmali9421"
                        className="p-2 rounded font-medium text-white bg-orange-600 flex items-center justify-center gap-2"
                    >
                        Profile Tracker
                        <svg
                            className="inline w-3.5 h-3.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div>
            <a href="/profile/siddharthsingh">
                <img
                    alt="Codolio Landing"
                    fetchPriority="high"
                    width="800"
                    height="0"
                    decoding="async"
                    className="mx-auto w-[50rem] h-auto border-2 border-gray-300 dark:border-gray-700 shadow-xl rounded-2xl dark:shadow-gray-800 relative z-20"
                    src="https://codolio.com/landing/landing_dark.png"
                    style={{ color: "transparent" }}
                />
            </a>
        </section>
    );
};

export default HeroSection;