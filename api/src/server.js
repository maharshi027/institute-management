import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: './.env'
});

mongoose.connect('mongodb+srv://institute_management2511:Harsh2708@cluster0.dpjblty.mongodb.net/?appName=Cluster0')
  .then(() => console.log(" Database Connected"))
  .catch(err => console.log(" DB Error:", err));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


