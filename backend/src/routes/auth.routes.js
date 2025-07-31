import express from "express";
// import { User } from "../models/user.model.js";
import { register, login, createMeeting, addToHistory, getUserHistory } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post( register );
router.route("/login").post( login);


router.route("/protected").get( authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.id}, you're authenticated!` });
});

router.route("/create_meeting").post(authenticate, createMeeting);

router.route("/add_to_history").post(authenticate, addToHistory);
router.route("/get_all_history").get(authenticate, getUserHistory);

// 🚪 Logout
router.route("/logout").get( (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});


// 👤 Get current user
router.route("/me").get (authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome back, User ID: ${req.user.id}` });
});


export default router;