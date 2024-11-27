import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

function isValidEmailFormat(email) {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
}

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    // checking if email is valid
    if (!isValidEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // checking if password in valid
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // checking existing user with same email in db
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // checking username
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // taking random images
    const PROFILE_PICS = ["/avatar-1.jpg", "/avatar-2.jpg", "/avatar-3.jpg", "/avatar-4.jpg", "/avatar-5.jpg", "/avatar-6.jpg", "/avatar-7.jpg"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // making new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    //generate token
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in signup controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-MoviesR");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
