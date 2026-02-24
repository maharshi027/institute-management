import { Router } from "express";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { Log } from "../models/logs.model.js";
import { upload } from "../middleware/multer.middleware.js";
import { createLog } from "../utils/logger.js";

const router = Router();

router.post("/signup", upload.none(), async (req, res) => {
  const { instituteName, email, phone, password } = req.body;

  if (!instituteName || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }                                                 
    const newUser = new User({
      instituteName,
      email,
      phone,
      password
    });
    
    const savedUser = await newUser.save();

    await createLog(req, email, "SIGNUP", savedUser._id);

    return res.status(201).json({ newInstitute: savedUser });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {

      await createLog(req, email, "LOGIN_FAILURE");
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {

      await createLog(req, email, "LOGIN_FAILURE", user._id);
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        instituteName: user.instituteName,
      },
      process.env.ACCESS_TOKEN_SECRET
    );


    await createLog(req, email, "LOGIN", user._id);

    return res.status(200).json({
      instituteName: user.instituteName,
      email: user.email,
      token: token
    });

  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/activity-logs", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;