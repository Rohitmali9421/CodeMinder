import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import WorkspaceTable from "./workspaceTable";

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


                    {["Difficulty", "Topics"].map((filter, index) => (
                        <Select key={index}>
                            <SelectTrigger className="w-32 flex items-center">
                                <SelectValue placeholder={filter} />

                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    ))}
                </div>

                {/* <div>
                    <CodingSheetItem />
                </div> */}
                {/* <div className="flex flex-col items-center gap-4 md:justify-center">
                   
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

                    
                    <div className="p-2 w-60 h-60 sm:w-80 sm:h-80 flex justify-center items-center rounded-full bg-[#d9d9d7] dark:bg-darkBox-700 select-none">
                        <img
                            src="https://codolio.com/codolio_assets/gif-owl-transparent.GIF"
                            alt="codolio owl"
                            loading="lazy"
                            className="object-contain w-full h-full max-w-full max-h-full"
                        />
                    </div>
                    
                </div> */}

                <WorkspaceTable/>
            </div>

        </section>
    );
};

export default Workspace;
