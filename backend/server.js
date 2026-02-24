import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./src/routes/user.routes.js";
import batchRouter from "./src/routes/batch.routes.js";
import studentRouter from "./src/routes/student.routes.js";
import feeRouter from "./src/routes/fee.routes.js";
import homeRouter from "./src/routes/home.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

connectDB();

const port = process.env.PORT || 5000;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/batch", batchRouter);
app.use("/student", studentRouter);
app.use("/fee", feeRouter);


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}...`);
});