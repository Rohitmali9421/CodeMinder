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

              

                

                <WorkspaceTable/>
            </div>

        </section>
    );
};

export default Workspace;