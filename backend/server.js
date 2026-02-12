import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import batchRouter from './routes/batch.routes.js';
import studentRouter from './routes/student.routes.js';
import feeRouter from './routes/fee.routes.js';
import homeRouter from "./routes/home.routes.js";


dotenv.config({ path: './.env' });

const app = express();

const port = process.env.PORT || 4000;

connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', homeRouter);
app.use("/user", userRouter);
app.use("/batch", batchRouter);
app.use('/student', studentRouter);
app.use('/fee', feeRouter);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}...`);
});