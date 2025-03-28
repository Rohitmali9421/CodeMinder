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

                

                <WorkspaceTable/>
            </div>

        </section>
    );
};

export default Workspace;
