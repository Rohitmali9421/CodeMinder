import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaClipboardList, FaSearch, FaStickyNote, FaChartBar, FaLayerGroup } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
    { to: "?tab=workspace", icon: <FaClipboardList />, label: "My Workspace" },
    { to: "?tab=explore", icon: <FaSearch />, label: "Explore Sheets" },
    { to: "?tab=mySheets", icon: <FaLayerGroup />, label: "My Sheets" },
    { to: "?tab=notes", icon: <FaStickyNote />, label: "Notes" },
    { to: "?tab=analysis", icon: <FaChartBar />, label: "Analysis" }
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Toggle dropdown when clicking Menu button
    const handleMenuClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <aside className="lg:w-[300px] w-full lg:h-screen flex flex-col justify-between bg-white border-r-2">
            {/* Small screen dropdown menu */}
            <div className="lg:hidden px-2">
                <Button
                    variant="outline"
                    className="flex items-center justify-between w-full"
                    onClick={handleMenuClick} 
                >
                    <span className="text-gray-800 font-semibold">Menu</span>
                    <FiChevronDown className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </Button>

                {isOpen && (
                    <div ref={dropdownRef} className="w-full mt-2 bg-white border rounded-lg shadow-md">
                        <NavLinks closeMenu={() => setIsOpen(false)} />
                    </div>
                )}
            </div>

            {/* Large screen sidebar */}
            <div className="hidden lg:block w-[300px]">
                <NavLinks />
            </div>
        </aside>
    );
};

const NavLinks = ({ closeMenu }) => {
    const location = useLocation();

    return (
        <ul className="flex flex-col gap-2 lg:w-[300px] w-full p-2">
            {navItems.map(({ to, icon, label }) => (
                <Link key={to} to={to} className="w-full" onClick={closeMenu}>
                    <Button
                        variant={location.search === to ? "secondary" : "ghost"}
                        className={`w-full flex items-center gap-2 justify-start rounded-lg py-2 transition-colors 
                            ${location.search === to ? "bg-gray-300 text-orange-600" : "hover:bg-gray-100"}`}
                    >
                        {icon} <span>{label}</span>
                    </Button>
                </Link>
            ))}
        </ul>
    );
};

export default Sidebar;
