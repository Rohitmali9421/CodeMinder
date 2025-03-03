import { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Notes() {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="w-full p-3 md:p-4 overflow-auto border-none shadow-sm lg:mb-8 no-scrollbar md:border lg:h-screen dark:bg-dark-900 dark:border-darkBorder-800">
      <section className="w-full md:mb-10 md:p-4">
        <div className="flex flex-col w-full no-scrollbar">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-full relative sm:w-[350px]">
                <Search className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                <input
                  placeholder="Search a question"
                  className="w-full p-1.5 pr-10 text-gray-800 bg-white border rounded-md dark:border-darkBorder-700 shadow-sm placeholder-gray-400 dark:bg-dark-900 dark:text-white focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} /> Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <ChevronLeft size={20} />
              </Button>
              <Button disabled className="opacity-50 cursor-not-allowed flex items-center gap-1">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col min-h-[500px] md:flex-row w-full lg:h-[76vh] md:h-[calc(100vh-40px)] gap-2 mt-4">
            <aside className="w-full rounded-md lg:w-[350px] h-full md:p-2 bg-white dark:bg-darkBox-900 dark:border-darkBorder-700 border flex-none md:w-[350px] max-h-full overflow-y-auto">
              <nav>
                <div className="flex items-center justify-between">
                  <Button
                    className={`px-4 py-2 w-full ${activeTab === "questions" ? "bg-gray-200 dark:bg-darkBox-700" : "bg-gray-50 dark:bg-darkBox-800"}`}
                    onClick={() => setActiveTab("questions")}
                  >
                    Question Notes
                  </Button>
                  <Button
                    className={`px-4 py-2 w-full ${activeTab === "general" ? "bg-zinc-200  dark:bg-darkBox-700" : "bg-gray-50   dark:bg-darkBox-800"}`}
                    onClick={() => setActiveTab("general")}
                  >
                    General Notes
                  </Button>
                </div>
                <div className="my-4 border-t border-gray-300 dark:border-darkBorder-700"></div>
                <ul className="flex flex-col gap-2 mt-2">
                  <div className="p-2 my-2 text-center dark:text-darkText-300">No Questions found</div>
                </ul>
              </nav>
            </aside>
            <div className="w-[115vh] h-full max-h-full p-2 overflow-y-auto bg-white border rounded-md md:p-2 no-scrollbar dark:bg-darkBox-900 dark:border-darkBorder-700"></div>
          </div>
        </div>
      </section>
    </div>
  );
}



