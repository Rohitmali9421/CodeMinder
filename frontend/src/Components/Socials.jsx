import React from "react";
import { FaLinkedin, FaTwitter, FaGlobe, FaFileAlt } from "react-icons/fa";

function SocialProfile() {
  return (
    <div className=" p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Social Profile</h3>
          <p className="text-sm text-gray-500">You can update your social media details here.</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">Update</button>
      </div>
      <div className="space-y-4">
        {/** Social Input Fields */}
        {[
          { label: "LinkedIn", icon: <FaLinkedin />, placeholder: "johndoe", prefix: "https://www.linkedin.com/in/" },
          { label: "Twitter", icon: <FaTwitter />, placeholder: "johndoe", prefix: "https://twitter.com/" },
          { label: "Website", icon: <FaGlobe />, placeholder: "https://www.portfolio.com" },
          { label: "Resume", icon: <FaFileAlt />, placeholder: "https://drive.com/resume" },
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 w-40">
              <span className="text-gray-700 text-lg">{item.icon}</span>
              <span className="text-gray-700 font-medium">{item.label}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center border rounded-md bg-gray-100 px-3 py-2">
                {item.prefix && <span className="text-gray-600 text-sm">{item.prefix}</span>}
                <input
                  type="text"
                  placeholder={item.placeholder}
                  className="flex-1 bg-transparent text-gray-800 outline-none px-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialProfile;
