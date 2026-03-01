import { sendToken } from "../helper/jwtToken.js";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate fields first
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    // 2️⃣ Check if user exists BEFORE creating
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User is Already exists",
      });
    }

    // 3️⃣ Only now create the user
    const user = await User.create({ name, email, password });

    // 4️⃣ Generate JWT
    sendToken(user, 201, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password Fields are Not Empty",
      });
    }
    // Also Validate Password Type
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    // 2️⃣ Check user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // 3️⃣ Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email or Password Incorrect",
      });
    }

    // 4️⃣ Generate JWT
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};
