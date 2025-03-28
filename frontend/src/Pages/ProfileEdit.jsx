import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces } from "react-icons/si";
import { MdWarning } from "react-icons/md";
import axios from "axios";

const ProfileEdit = () => {
  const { user, token } = useSelector((state) => state.auth); // ✅ Extract user and token
  const dispatch = useDispatch();

  // Initialize state with user data
  const [name, setName] = useState(user?.name || "John Doe");
  const [email, setEmail] = useState(user?.email || "example@example.com");
  const [platforms, setPlatforms] = useState({
    github: user?.platforms?.github || "",
    leetcode: user?.platforms?.leetcode || "",
    geeksforgeeks: user?.platforms?.geeksforgeeks || "",
    codeforces: user?.platforms?.codeforces || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "John Doe");
      setEmail(user.email || "example@example.com");
      setPlatforms({
        github: user.platforms?.github || "",
        leetcode: user.platforms?.leetcode || "",
        geeksforgeeks: user.platforms?.geeksforgeeks || "",
        codeforces: user.platforms?.codeforces || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setPlatforms({ ...platforms, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.put(
        "http://localhost:4000/user/edit",
        { name, platforms },
        
      );

      setMessage({ type: "success", text: response.data.message });

      // ✅ Update Redux state with new user data
      dispatch({ type: "UPDATE_USER", payload: response.data.user });

    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.error || "Failed to update profile. Try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Edit Profile</h2>

      {/* Message Display */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-white text-center ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Name Section */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Email Section (Not Editable) */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="block w-full mt-1 p-3 border rounded-lg shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Platforms Section */}
      <h3 className="text-2xl font-medium mt-8 text-center">Platforms</h3>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(platforms).map((platform) => (
          <PlatformItem
            key={platform}
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            icon={getPlatformIcon(platform)}
            value={platforms[platform]}
            name={platform}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveChanges}
        className="w-full mt-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-medium shadow-md"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

const PlatformItem = ({ icon, label, value, name, onChange }) => (
  <div className="flex items-center gap-4 border p-3 rounded-lg shadow-sm bg-gray-50">
    {icon}
    <span className="font-medium text-gray-800">{label}</span>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="flex-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      placeholder="Enter username"
    />
  </div>
);

const getPlatformIcon = (platform) => {
  const icons = {
    github: <FaGithub className="w-6 h-6 text-gray-800" />,
    leetcode: <SiLeetcode className="w-6 h-6 text-gray-800" />,
    geeksforgeeks: <SiGeeksforgeeks className="w-6 h-6 text-gray-800" />,
    codeforces: <SiCodeforces className="w-6 h-6 text-gray-800" />,
  };
  return icons[platform] || <MdWarning className="w-6 h-6 text-gray-800" />;
};

export default ProfileEdit;
