import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AccountSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full p-4 bg-white border rounded-md dark:bg-gray-900 dark:border-gray-800">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl text-gray-800 dark:text-gray-300 font-medium">
            Accounts
          </h3>
          <p className="text-sm text-gray-500">
            You can manage your accounts here.
          </p>
        </div>
      </div>

      {/* Account Information */}
      <div className="flex flex-col gap-8 mt-8">
        <div>
          <h2 className="font-medium text-lg text-gray-600 dark:text-gray-400">
            Account Information
          </h2>
          <div className="mt-4 text-sm font-normal">
            <div className="grid grid-cols-4 gap-4 dark:text-gray-400">
              <h3>Codolio ID:</h3>
              <div className="flex items-center justify-between w-full col-span-2">
                <span>YoZzXkbH</span>
                <button className="text-sm text-blue-600">Edit</button>
              </div>
            </div>
            <hr className="my-2 dark:border-gray-700" />
            <div className="grid grid-cols-4 gap-4 dark:text-gray-400">
              <h3>Email:</h3>
              <span className="col-span-2">vaibhavpatil00913@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Update Password */}
        <div>
          <h2 className="font-medium text-lg text-gray-600 dark:text-gray-400">
            Update Password
          </h2>
          <form className="mt-4 flex flex-col gap-4 text-sm">
            {/* Old Password */}
            <div className="grid gap-2 sm:grid-cols-4 sm:gap-4">
              <h3>Old Password:</h3>
              <div className="col-span-2 relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md bg-gray-50 dark:border-gray-700 dark:text-white dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 px-3 text-gray-400"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="grid gap-2 sm:grid-cols-4 sm:gap-4">
              <h3>New Password:</h3>
              <div className="col-span-2 relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md bg-gray-50 dark:border-gray-700 dark:text-white dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 px-3 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2 sm:grid-cols-4 sm:gap-4">
              <h3>Confirm Password:</h3>
              <div className="col-span-2 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md bg-gray-50 dark:border-gray-700 dark:text-white dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 px-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
