
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Explore = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col w-full h-full gap-8 no-scrollbar">
      {/* Header */}
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold dark:text-darkText-300">
          Track Coding Sheets in One Place
        </h3>
        <p className="text-sm text-gray-600 dark:text-darkText-400">
          Choose from 30+ structured coding paths
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-[26rem]">
        <Search className="absolute w-5 h-5 text-gray-400 right-3 top-1/2 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search any coding sheet"
          className="w-full p-2 pr-10 text-gray-800 bg-white border shadow-sm dark:border-darkBorder-700 dark:bg-dark-900 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="relative flex flex-wrap justify-center gap-2 md:gap-4 w-fit">
        {[
          { label: "All", active: true },
          { label: "Popular" },
          { label: "Quick Revision" },
          { label: "Complete DSA" },
          { label: "Topic Specific" },
          { label: "Competitive" },
        ].map(({ label, active }) => (
          <Button
            key={label}
            variant={active ? "default" : "outline"}
            className="w-[45%] md:w-[140px] py-3 font-medium"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Codolio Image (for large screens) */}
      <img
        alt="codolio"
        loading="lazy"
        width="256"
        height="0"
        className="hidden w-64 xl:block xl:absolute right-[-5.65rem]"
        src="/codolio_assets/codolio_explore.png"
      />
    </div>
  );
};

export default Explore;
