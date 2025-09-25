import bcrypt from "bcrypt";
import { setUser } from "../Services/Auth.js";
import User from "../Model/User.js";

// ----------------------- Handle User Signup -----------------------
async function handleSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = setUser(newUser);
    const { password: _, sheets, ...userData } = newUser.toObject();

    return res.status(201).json({ user: userData, token });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}

// ----------------------- Handle User Login -----------------------
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = setUser(user);
    const { password: _, ...userData } = user._doc;

    return res.status(200).json({ user: userData, token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}

// ----------------------- Get Current User -----------------------
const handleGetUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Fetch User Error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// ----------------------- Edit User Profile -----------------------
async function handleEditUser(req, res) {
  try {
    const userId = req.user.id;
    const { name, platforms } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (platforms) {
      user.platforms.github = platforms.github || user.platforms.github;
      user.platforms.leetcode = platforms.leetcode || user.platforms.leetcode;
      user.platforms.codeforces = platforms.codeforces || user.platforms.codeforces;
    }

    await user.save();

    const { password, sheets, ...userData } = user._doc;
    return res.status(200).json({ message: "Profile updated successfully", user: userData });
  } catch (error) {
    console.error("Edit User Error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}

export { handleSignUp, handleLogin, handleGetUser, handleEditUser };
