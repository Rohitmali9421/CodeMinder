import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Please wait...</p>
      </div>
    </div>
  );
}

export default Loading;