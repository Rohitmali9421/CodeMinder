import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaFilter, FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";

const Notes = () => {
  const [selectedTab, setSelectedTab] = useState("questionNotes");

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {/* Search and Controls */}
      <div className="flex justify-between w-full p-2">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-[350px]">
            <FaSearch className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
            <Input placeholder="Search a question" className="pr-10" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <FaFilter />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaArrowLeft />
          </Button>
          <Button variant="outline" disabled className="opacity-50 cursor-not-allowed">
            <FaArrowRight />
          </Button>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Main Content */}
      <div className="flex flex-1 w-full h-full gap-2 overflow-hidden">
        {/* Sidebar */}
        <Card className="w-[350px] h-full p-2 overflow-y-auto flex-none">
          <nav>
            <div className="flex items-center justify-between">
              <Button
                className={`w-full ${
                  selectedTab === "questionNotes" ? "bg-gray-200 dark:bg-darkBox-700" : "bg-gray-50 dark:bg-darkBox-800"
                }`}
                onClick={() => setSelectedTab("questionNotes")}
              >
                Question Notes
              </Button>
              <Button
                className={`w-full ${
                  selectedTab === "generalNotes" ? "bg-gray-200 dark:bg-darkBox-700" : "bg-gray-50 dark:bg-darkBox-800"
                }`}
                onClick={() => setSelectedTab("generalNotes")}
              >
                General Notes
              </Button>
            </div>
            <Separator className="my-4" />
            <ul className="flex flex-col gap-2 mt-2">
              <div className="p-2 text-center dark:text-darkText-300">No Questions found</div>
            </ul>
          </nav>
        </Card>

        {/* Main Content Area */}
        <Card className="flex-1 w-96 h-full p-2 overflow-y-auto"></Card>
      </div>
    </div>
  );
};

export default Notes;
