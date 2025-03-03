import React from "react";

const MySheets = () => {
  return (
    <section className="w-full md:mb-10 md:p-4">
      <div className="fixed bottom-8 right-8 text-white rounded-full cursor-pointer w-[5rem] h-[5rem] transition-all duration-300 z-[999] flex justify-center items-center shadow-lg">
        <button className="bg-blue-600 rounded-full w-[4rem] h-[4rem] flex justify-center items-center hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256" className="z-30" strokeWidth="2">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">My Sheets</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Based on your personal and followed sheets</p>
        </div>

        {/* Followed Sheets Section */}
        <div className="flex flex-col gap-4 p-2">
          <h4 className="text-xl font-medium text-gray-600 dark:text-gray-400">Followed Sheets</h4>
          <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <div className="p-4 font-semibold text-gray-800 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300">
              <h3>No Sheets Followed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get Started by following a sheet</p>
              <div className="mt-6">
                <button className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">Explore</button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4">
          <hr className="border-gray-300 dark:border-gray-700" />
        </div>

        {/* Custom Sheets Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-medium text-gray-600 dark:text-gray-400">Custom Sheets</h4>
          <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <div className="p-4 font-semibold text-gray-800 bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300">
              <h3>No Sheets Found</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get Started by creating a sheet</p>
              <div className="mt-6">
                <button className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">Create Sheet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySheets;
