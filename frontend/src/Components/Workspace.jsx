import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FaSearch, FaChevronDown, FaStar, FaPlus } from "react-icons/fa";

const Workspace = () => {
    return (
        <section className="w-full md:mb-10 md:p-4">
            <div className="flex flex-col h-full text-black">
                {/* Title Section */}
                <div className="flex flex-col">
                    <h3 className="text-2xl font-semibold">My Workspace</h3>
                    <p className="text-sm text-gray-600">Keep track of all your questions here</p>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-[50%] xl:flex-1">
                        <Input placeholder="Search question" className="pl-8" />
                        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>

                    {/* Filters */}
                    {["Difficulty", "Status", "Topics", "Companies", "Custom Tags"].map((filter, index) => (
                        <Select key={index}>
                            <SelectTrigger className="w-32 flex items-center">
                                <SelectValue placeholder={filter} />

                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={filter}>{filter}</SelectItem>
                            </SelectContent>
                        </Select>
                    ))}

                    {/* Favorites Button */}
                    <Button variant="outline" className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" size={16} /> Favourites
                    </Button>

                    {/* Sorting Buttons */}
                    <div className="flex gap-2">
                        <Button variant="outline">Latest</Button>
                        <Button variant="outline">Oldest</Button>
                        <Select>
                            <SelectTrigger className="w-24 flex items-center">
                                <SelectValue placeholder="Sort By" />

                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="latest">Latest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Button */}
                    <Button variant="outline">Date</Button>

                    {/* Import Button */}
                    <div className="flex-1 flex justify-end">
                        <Button className="flex items-center gap-1">
                            <FaPlus size={18} /> Import
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 md:justify-center">
                    {/* Text Section */}
                    <div className="flex flex-col items-center w-full max-w-[80vw] sm:max-w-[50vw]">
                        <h1 className="text-center text-black dark:text-darkText-300 text-4xl font-medium my-2">
                            Add your First Question
                        </h1>
                        <p className="text-gray-600 font-medium dark:text-darkText-400 text-center">
                            Question Tracker will be your go-to resource for quick revision and
                            interview preparation. Add questions you've solved or plan to tackle,
                            tag them, and include notes.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="p-2 w-60 h-60 sm:w-80 sm:h-80 flex justify-center items-center rounded-full bg-[#d9d9d7] dark:bg-darkBox-700 select-none">
                        <img
                            src="https://codolio.com/codolio_assets/gif-owl-transparent.GIF"
                            alt="codolio owl"
                            loading="lazy"
                            className="object-contain w-full h-full max-w-full max-h-full"
                        />
                    </div>
                </div>

                {/* Floating Add Button */}
                <div className="fixed bottom-8 right-8">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="rounded-full w-[4rem] h-[4rem] flex justify-center items-center bg-primary text-white shadow-lg">
                                <FaPlus size={24} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <p className="text-lg">Add a new question here.</p>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

        </section>
    );
};

export default Workspace;
