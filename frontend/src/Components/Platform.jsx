import React from 'react';
import { FaGithub,  FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks, SiCodechef, SiCodeforces } from 'react-icons/si';
import { MdVerified, MdDelete, MdWarning } from 'react-icons/md';
import { HiChevronRight } from 'react-icons/hi';

const Platforms = () => {
  return (
    <div className="w-full p-4 bg-white border rounded-lg dark:bg-darkBox-900 dark:border-darkBox-800">
      <div className="overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-2xl text-gray-800 dark:text-darkText-300 font-medium">Platforms</h3>
            <p className="text-sm text-gray-500">You can update and verify your platform details here.</p>
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white rounded-lg bg-blue-500 hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>

        {/* Development Section */}
        <div className="mt-10 md:ml-8 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-medium leading-6 text-gray-900 dark:text-darkText-400">Development</h1>
            <div className="flex flex-col gap-4">
              {/* GitHub Platform */}
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-2 w-[88%]">
                  <FaGithub className="w-8 h-8 text-gray-800 dark:text-darkText-400" />
                  <label className="text-base font-medium leading-6 text-gray-900 dark:text-darkText-400">Github</label>
                  <HiChevronRight className="text-gray-800 dark:text-darkText-400" />
                </div>
                <button className="border rounded-lg bg-gray-100 dark:bg-darkBox-800 text-gray-800 dark:text-darkText-400 py-1.5 w-[100px] font-medium dark:border-darkBorder-700">
                  Connect
                </button>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 border-[1.5px] dark:border-darkBorder-700" />

          {/* Problem Solving Section */}
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-medium leading-6 text-gray-900 dark:text-darkText-400">Problem Solving</h1>
            <div className="flex flex-col gap-4">
              {/* LeetCode Platform */}
              <PlatformItem
                icon={<SiLeetcode className="w-8 h-8 text-gray-800 dark:text-darkText-400" />}
                label="Leetcode"
                urlPrefix="https://leetcode.com/u/"
                username="vaibhavpatil05"
                verified
              />

              

              {/* GeeksforGeeks Platform */}
              <PlatformItem
                icon={<SiGeeksforgeeks className="w-8 h-8 text-gray-800 dark:text-darkText-400" />}
                label="GeeksforGeeks"
                urlPrefix="https://www.geeksforgeeks.org/user/"
                username="vaibhavpatil05"
                verified
              />

            

              {/* Codechef Platform */}
              <PlatformItem
                icon={<SiCodechef className="w-8 h-8 text-gray-800 dark:text-darkText-400" />}
                label="Codechef"
                urlPrefix="https://www.codechef.com/users/"
              />

              {/* Codeforces Platform */}
              <PlatformItem
                icon={<SiCodeforces className="w-8 h-8 text-gray-800 dark:text-darkText-400" />}
                label="Codeforces"
                urlPrefix="https://codeforces.com/profile/"
              />


            
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

// Reusable PlatformItem Component
const PlatformItem = ({ icon, label, urlPrefix, username, verified }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1">
        <div className="flex flex-col relative items-end">
          <div className="grid w-full grid-cols-1 gap-2 md:gap-0 md:grid-cols-10 lg:grid-cols-1 xl:grid-cols-10">
            <div className="flex items-center gap-2 md:col-span-3">
              {icon}
              <label className="text-base font-medium leading-6 text-gray-900 dark:text-darkText-400">{label}</label>
              <HiChevronRight className="text-gray-800 dark:text-darkText-400" />
            </div>
            <div className="relative md:col-span-7">
              <div className="flex p-0.5 bg-gray-50 dark:bg-darkBox-800 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-darkBorder-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <span className="items-center hidden pl-3 text-sm text-gray-800 select-none dark:text-darkText-500 sm:flex">
                  {urlPrefix}
                </span>
                <div className="relative w-full">
                  <input
                    className="block flex-1 border-0 bg-transparent py-1.5 w-full pl-1 outline-none text-gray-900 dark:text-darkText-400 placeholder:text-gray-400 dark:placeholder:text-darkText-400 focus:ring-0 text-sm sm:leading-6"
                    placeholder="johndoe"
                    type="text"
                    value={username || ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[100px] md:w-[110px] justify-end items-center gap-2">
        {verified && (
          <button className="group h-fit w-fit p-1 rounded-lg border-gray-300 relative cursor-pointer">
            <div className="absolute z-[100] items-center hidden gap-2 px-2 py-1 text-xs text-black font-normal dark:bg-darkBox-800 dark:text-darkText-300 bg-white border rounded-lg shadow-md whitespace-nowrap group-hover:flex top-8 dark:border-darkBorder-700">
              <span>Verified</span>
            </div>
            <MdVerified className="w-6 h-6 text-green-500" />
          </button>
        )}
        <button className="group h-fit w-fit border p-1.5 rounded-lg border-gray-300 dark:bg-darkBox-800 dark:border-darkBorder-700 bg-gray-50 text-blue-500 cursor-pointer">
          <MdDelete className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Platforms;