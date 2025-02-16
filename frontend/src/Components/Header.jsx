import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle theme
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const mainBody = document.getElementById("main-body");
        if (mainBody) {
            mainBody.classList.toggle("dark");
        }
    };

    return (
        <header className="flex fixed top-0 left-0 px-4 md:px-2 border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 items-center z-50 justify-between w-full shadow-md">
            {/* Logo Section */}
            <a className="flex items-center gap-2 py-2 text-lg sm:ml-4" href="/">
                <img src="https://codolio.com/codolio_assets/codolio.svg" alt="Codolio" width="30" height="30" />
                <div>
                    <span className="font-bold text-gray-900 dark:text-white">Code</span>
                    <span className="font-bold text-blue-600">Minder</span>
                </div>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button className="block md:hidden -mr-1" onClick={() => setMenuOpen(!menuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                </svg>
            </button>

            {/* Navigation Links */}
            <nav className={`md:flex items-center justify-center gap-2 mr-2 hidden ${menuOpen ? "block" : "hidden"}`}>
                <a className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded" href="/question-tracker">Question Tracker</a>
                <a className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded" href="/event-tracker">Event Tracker</a>
                <a className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded" href="/profile/Rohitmali9421">Profile Tracker</a>
            </nav>

            {/* Profile & Theme Toggle */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle Button */}
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-900" />}
                </Button>

                {/* Profile/Login */}
                <div className="relative">
                    <Link to="/login" className="py-1.5 font-[500] px-3 text-sm bg-blue-800 rounded-md text-white round-border">
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
