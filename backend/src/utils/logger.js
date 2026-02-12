import Log from "../models/Log.model.js";

export const createLog = async (req, email, action, userId = null) => {
  try {
    const userAgent = req.headers["user-agent"];
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    await Log.create({
      userId,
      email,
      action,
      ipAddress: ip,
      userAgent,
      location: req.headers["x-region"] || "Localhost" 
    });
  } catch (error) {
    console.error("Logging Error:", error);
  }
};