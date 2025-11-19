import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import userRouter from "./routes/user.routes.js"
import batchRouter from './routes/batch.routes.js'
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/user", userRouter);
app.use("/batch", batchRouter);

export { app };
