import React from "react";
import { Link } from "react-router-dom";
const features = [
    {
        img: "https://codolio.com/static/Profile_Tracker.png",
        title: "All in One Coding Profile",
        description:
            "Showcase your complete coding portfolio, track all stats, and share your progress effortlessly in one place.",
    },
    {
        img: "https://codolio.com/static/Question_Tracker.png",
        title: "Follow Popular Sheets",
        description:
            "Organize question notes and follow popular coding sheets in one place for seamless review and effective revision.",
    },
    {
        img: "https://codolio.com/static/Contest_Tracker.png",
        title: "Contest Tracker",
        description:
            "Stay on top of coding contests by tracking schedules and setting reminders effortlessly with a single click.",
    },
];
const SignIn = () => {
    return (
        <main className="w-full min-h-[80vh] pt-11">
            <div className="content">
                <div className="w-full -mt-12 min-h-[90vh] md:h-[100vh] flex items-center justify-center">
                    <div className="flex w-full h-full bg-white">
                        {/* Sign-in Form Section */}
                        <div className="flex-1 flex justify-center items-center py-4">
                            <div className="w-full flex flex-col gap-y-4 max-w-md p-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
                                    </div>
                                    <Link to="/signup">
                                        <div className="mt-2 text-sm text-gray-600">
                                            Don't have an account yet? <button className="font-medium text-blue-600 hover:underline">Sign up here</button>
                                        </div>
                                    </Link>
                                    <hr className="mx-auto mt-2 border-gray-200" />
                                </div>
                                <form className="mt-2">
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
                                            <input id="email" className="block w-full px-4 py-2.5 text-sm border border-gray-200 rounded-md outline-none" placeholder="Enter email address" type="email" name="email" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className=" mb-1 text-sm font-medium text-gray-700 flex justify-between">
                                                <span>Password</span>
                                                <a className="text-sm font-medium text-blue-600 hover:underline" href="/forgot-password">Forgot password?</a>
                                            </label>
                                            <input id="password" className="block w-full px-4 py-2.5 text-sm border border-gray-200 rounded-md outline-none" placeholder="Enter password" type="password" name="password" />
                                        </div>
                                        <button type="submit" className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md">Sign in</button>
                                    </div>
                                </form>
                                <div className="relative text-center mt-4">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative bg-white px-6 text-gray-900">Or continue with</div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button className="border px-6 py-2 rounded-md">Sign in with Google</button>
                                </div>
                                <p className="text-xs text-center mt-4 text-gray-800">
                                    By signing in or creating an account, you agree to our
                                    <a href="/terms-and-conditions" className="ml-1 text-blue-500 underline">Terms & Conditions</a>
                                    and our
                                    <a href="/privacy-policy" className="ml-1 text-blue-500 underline">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                        <div className="relative hidden md:flex px-2 md:flex-col flex-1 h-full bg-orange-500">
                            <div className="relative overflow-hidden text-white z-20 md:flex-col md:flex bg-codolioBase h-full justify-center items-center">
                                {/* Background Bubbles */}
                                <img
                                    alt="top bubble"
                                    className="absolute top-8 left-32 opacity-25"
                                    src="https://codolio.com/_next/image?url=%2Fstatic%2FBubble.png&w=256&q=75"
                                />
                                <img
                                    alt="side bubble"
                                    className="absolute top-[50%] -right-[15%] opacity-25"
                                    src="/_next/image?url=%2Fstatic%2FBubble.png&w=640&q=75"
                                />
                                <img
                                    alt="bottom bubble"
                                    className="absolute -bottom-6 opacity-25"
                                    src="/_next/image?url=%2Fstatic%2FBubble.png&w=384&q=75"
                                />
                                <img
                                    alt="Mesh"
                                    className="absolute -right-14 top-0 opacity-25"
                                    src="https://codolio.com/_next/image?url=%2Fstatic%2FMesh.png&w=750&q=75"
                                />

                                {/* Heading */}
                                <h1 className="text-4xl mt-10 text-white font-semibold">Welcome to Codolio</h1>

                                {/* Features Section */}
                                <div className="flex flex-col mt-8 gap-14 max-w-lg">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="w-[160px] h-[120px] flex justify-center items-center bg-white round-border">
                                                <img src={feature.img} alt={feature.title} />
                                            </div>
                                            <div className="flex w-full flex-col gap-1">
                                                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                                                <p className="font-[500] leading-tight text-gray-200">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Owl Image */}
                                <img
                                    alt="codolio owl"
                                    className="absolute mx-auto top-6 -left-24 hidden lg:block -rotate-[30deg] h-auto border-gray-300"
                                    src="/codolio_assets/gif-owl-transparent.GIF"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignIn;
