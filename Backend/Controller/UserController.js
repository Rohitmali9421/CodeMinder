import bcrypt from "bcrypt";
import { setUser } from "../Services/Auth.js";
import User from "../Model/User.js";

async function handleSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).error({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = setUser(newUser);
    const {
      password: _,
      sheets: __,
      ...userWithoutSensitiveData
    } = newUser._doc;

    return res
      .status(200)
      .json({ user: userWithoutSensitiveData, token: accessToken });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("-sheets");

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = setUser(user);
    const { password: _, ...userWithoutPassword } = user._doc;

    return res
      .status(200)
      .json({ user: userWithoutPassword, token: accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
}

// handle get user
const handleGetUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);

    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};
// handle question solved bu user

export { handleSignUp, handleLogin, handleGetUser };
