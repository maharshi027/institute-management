import { Router } from "express";
import multer from "multer";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
const router = Router();
const upload = multer();

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
      return res.status(409).json({ error: "User already exists" });
    }
    const newUser = new User({
      instituteName,
      email,
      phone,
      password
    });

    const savedUser = await newUser.save();

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
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await user.isPasswordCorrect(password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({
    userId: user._id,
    email: user.email,  
    instituteName: user.instituteName,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  })
  const userObj = user.toObject();
  userObj.token = token;
  return res.status(200).json(userObj);

  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


export default router;
