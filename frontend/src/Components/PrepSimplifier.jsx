const PrepSimplifier = () => {
    const features = [
        {
            title: "My Workspace",
            description: "Tag & filter questions for easy organization",
            imgSrc: "https://codolio.com/_next/image?url=%2Flanding%2Fworkspace_dark.png&w=96&q=75",
            imgWidth: 80,
        },
        {
            title: "Sheet Tracker",
            description: "Track all coding sheets in one place",
            imgSrc: "https://codolio.com/_next/image?url=%2Flanding%2Fsheet_tracker_dark.png&w=48&q=75",
            imgWidth: 48,
        },
        {
            title: "Enhanced Notes",
            description: "Add detailed notes to questions easily.",
            imgSrc: "https://codolio.com/_next/image?url=%2Flanding%2Fnotes_dark.png&w=48&q=75",
            imgWidth: 48,
        },
    ];

    return (
        <div>
            <div className="flex flex-col items-center justify-between md:flex-row gap-8">
                {/* Left Side: Heading & Text */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold text-center sm:text-start md:text-4xl dark:text-white lg:text-5xl">
                        Simplify Your Prep
                    </h3>
                    <p className="text-center sm:text-start font-[550] md:text-lg lg:text-xl text-gray-500 dark:text-darkText-400">
                        Say goodbye to last-minute stress. Track all your questions and notes
                        in one place for easy review and revision.
                    </p>
                    <a className="font-semibold text-center text-blue-800 sm:text-start" href="/question-tracker">
                        Try Question Tracker →
                    </a>
                </div>

                {/* Right Side: Features */}
                <div className="flex mt-8 space-x-4">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <img
                                alt={feature.title}
                                loading="lazy"
                                width={feature.imgWidth}
                                height="0"
                                decoding="async"
                                className="mx-auto"
                                src={feature.imgSrc}
                                style={{ color: "transparent" }}
                            />
                            <p className="mt-2 font-semibold text-center">{feature.title}</p>
                            <p className="text-xs font-semibold text-center text-gray-500 sm:text-sm dark:text-darkText-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="border-1 dark:border-darkBorder-800 rounded-lg min-h-[10rem] bg-no-repeat bg-cover bg-center overflow-hidden">
                <img
                    alt=" "
                    loading="lazy"
                    width="1752"
                    height="1001"
                    decoding="async"
                    className="w-full h-auto"
                    src="https://codolio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fqt_dark.bd1a507c.png&w=1920&q=75"
                    style={{ color: "transparent" }}
                />
            </div>
        </div>

    );
};

export default PrepSimplifier;