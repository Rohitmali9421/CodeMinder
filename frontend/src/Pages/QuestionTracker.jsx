import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../Components/SideBar';
import Workspace from '../Components/Workspace';
import Explore from '../Components/Explore';
import Analysis from '@/Components/Analysis';
import MySheets from '@/Components/MySheets';
import Notes from '@/Components/Notes';

function QuestionTracker() {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "workspace";

    return (
        <div className='flex pt-10 flex-col w-full h-full gap-2  overflow-hidden border-t md:gap-0 dark:border-darkBorder-700  lg:flex-row md:px-0'>
            <Sidebar />

            {/* Conditional rendering using && */}
            {tab === "workspace" && <Workspace/>}
            {tab === "explore" && <Explore/>}
            {tab === "mySheets" && <h1><MySheets/></h1>}
            {tab === "notes" && <h1><Notes/></h1>}
            {tab === "analysis" && <Analysis/>}
        </div>
    );
}

export default QuestionTracker;
