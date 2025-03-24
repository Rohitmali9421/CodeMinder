import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "@/Features/Auth/AuthSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch])
    return (
        <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md z-50">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
                {/* Logo Section */}
                <Link className="flex items-center gap-2" to="/">
                    <img src="https://codolio.com/codolio_assets/codolio.svg" alt="Codolio" width="30" height="30" />
                    <div>
                        <span className="font-bold text-black">Code</span>
                        <span className="font-bold text-blue-600">Minder</span>
                    </div>
                </Link>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                                </svg>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            {user ? (
                                <div className="flex flex-col mt-6 text-center">
                                    <Link to="/profile/Rohitmali9421">
                                        <img className="w-[120px] h-[120px] mx-auto rounded-full border border-gray-300 shadow" src={user.profilePic?.url} alt="Profile" />
                                    </Link>
                                    <div className="mt-2">
                                        <span className="text-base font-semibold">{user.name}</span>
                                        <span className="block text-xs text-gray-600">{user.email}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <Link className="p-1.5 hover:bg-gray-100 rounded" to="/profile">Profile</Link>
                                    <Link className="p-1.5 hover:bg-gray-100 rounded" to="/profile/edit-profile">Edit Profile</Link>
                                    <Link className="p-1.5 hover:bg-gray-100 rounded" to="/faq">FAQ</Link>
                                    <Link className="p-1.5 hover:bg-gray-100 rounded" to="/event-tracker">Event Tracker</Link>
                                    <Link className="p-1.5 hover:bg-gray-100 rounded" to="/question-tracker">Question Tracker</Link>
                                    <Button variant="destructive" className="mt-3">Log Out</Button>
                                </div>
                            ) : (
                                <nav className="flex flex-col gap-4 mt-6">
                                    <Link className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded transition" to="/question-tracker">Question Tracker</Link>
                                    <Link className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded transition" to="/event-tracker">Event Tracker</Link>
                                    <Link className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded transition" to="/profile/Rohitmali9421">Profile Tracker</Link>
                                    <Link to="/login">
                                        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition">Login</Button>
                                    </Link>
                                </nav>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition" to="/question-tracker">Question Tracker</Link>
                    <Link className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition" to="/event-tracker">Event Tracker</Link>
                    <Link className="px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition" to="/profile/Rohitmali9421">Profile Tracker</Link>
                    
                    {user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="p-0">
                                    <img src={user.profilePic?.url} alt="Profile" className="w-10 h-10 rounded-full border border-gray-300 object-cover hover:scale-105 transition" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-52 p-3 bg-white shadow-lg rounded-lg border border-gray-200">
                                <div className="text-center">
                                    <span className="block text-sm font-semibold">{user.name}</span>
                                    <span className="block text-xs text-gray-600">{user.email}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex flex-col gap-2">
                                    <Link className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded transition" to="/profile">Profile</Link>
                                    <Link className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded transition" to="/profile/edit">Edit Profile</Link>
                                    <Button variant="destructive" className="w-full mt-2 hover:opacity-90 transition">Log Out</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link to="/login">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition">Login</Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
