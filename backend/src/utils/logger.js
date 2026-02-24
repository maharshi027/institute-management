import { Log } from "../models/logs.model.js";

export const createLog = async (req, email, action, userId = null) => {
  try {
    const userAgent = req.headers["user-agent"] || "unknown";
    const ip = req.headers["x-forwarded-for"]?.split(',')[0] || req.socket.remoteAddress;

    await Log.create({
      userId,
      email,
      action,
      ipAddress: ip,
      userAgent,
      location: req.headers["x-region"] || "Localhost/Network", 
    });
  } catch (error) {
    console.error("LOGGING_ERROR:", error);
  }
};