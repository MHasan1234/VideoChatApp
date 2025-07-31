import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { createToken } from "../utils/token.js";
import { Meeting } from "../models/meeting.model.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error " });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) { 
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createMeeting = async (req, res) => {
  try {
    const meetingCode = crypto.randomBytes(3).toString("hex"); // 6-character code
    const userId = req.user.id;

    const newMeeting = new Meeting({
      meetingCode,
      user_id: userId,
    });

    await newMeeting.save();

    res.status(201).json({ message: "Meeting created", meetingCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create meeting" });
  }
};

// Save a meeting to user's history
export const addToHistory = async (req, res) => {
  const {  meetingCode } = req.body;
console.log("Received meetingCode:", meetingCode);

  if (!meetingCode) {
    return res.status(400).json({ message: "meetingCode is required in body" });
  }
  

  try {
    const user = await User.findById( req.user.id ); // You can also use `req.user.id` if using JWT
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const newMeeting = new Meeting({
      user_id: user._id,
      meetingCode,
    });

    await newMeeting.save();
    res.status(201).json({ message: "Meeting added to history" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving meeting" });
  }
};

// Fetch all meetings from user history
export const getUserHistory = async (req, res) => {
  const { meetingCode } = req.query;

  try {
    const user = await User.findById( req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const meetings = await Meeting.find({ user_id: user._id });
    res.status(200).json(meetings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching history" });
  }
};
