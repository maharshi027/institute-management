import mongoose, { Schema } from "mongoose";

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  email: { type: String, required: true },
  action: { 
    type: String, 
    enum: ["LOGIN", "LOGIN_FAILURE", "SIGNUP", "BOT_ATTACK"], 
    required: true 
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  location: { type: String, default: "Unknown" },

}, { timestamps: true });

export const Log = mongoose.model("Log", logSchema);