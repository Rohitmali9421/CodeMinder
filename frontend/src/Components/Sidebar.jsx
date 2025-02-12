

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaClipboardList, FaSearch, FaStickyNote, FaChartBar, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full h-screen lg:w-[300px] flex flex-col justify-between p-2 bg-white dark:bg-dark-900 border-r dark:border-darkBorder-700">
      {/* Mobile Sidebar (Sheet Drawer) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full lg:hidden p-2">
            <span className="text-gray-800 font-semibold dark:text-darkText-300">Menu</span>
            <FiChevronDown className="dark:text-darkText-400" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white dark:bg-dark-900 p-4">
          <NavLinks />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <NavLinks />
      </div>
    </aside>
  );
};

const NavLinks = () => {
  return (
    <ul className="flex flex-col justify-between h-full gap-2">
      <div className="flex flex-col gap-2">
        {[
          { to: "?tab=workspace", icon: <FaClipboardList />, label: "My Workspace" },
          { to: "?tab=explore", icon: <FaSearch />, label: "Explore Sheets" },
          { to: "?tab=mySheets", icon: <FaLayerGroup />, label: "My Sheets" },
          { to: "?tab=notes", icon: <FaStickyNote />, label: "Notes" },
          { to: "?tab=analysis", icon: <FaChartBar />, label: "Analysis", active: true },
        ].map(({ to, icon, label, active }) => (
          <Link key={label} to={to}>
            <Button variant={active ? "secondary" : "ghost"} className="w-full flex items-center gap-2 justify-start">
              {icon} <span>{label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Codolio Extension Promo */}
      <li>
        <a
          href="https://chromewebstore.google.com/detail/codolio/hhldiohknhejgggdehdeepiggieflfjo"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-col p-3 border border-orange-200 bg-orange-50 dark:border-darkBorder-800 dark:bg-darkBox-800 rounded-lg"
        >
          <h3 className="font-semibold text-lg">Try Codolio Extension</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">With a single click, add to My Workspace</p>
        </a>
      </li>
    </ul>
  );
};

export default Sidebar;
