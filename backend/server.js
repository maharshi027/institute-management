import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./src/app.js";

dotenv.config({
  path: './.env'
});
const port = process.env.PORT || 4000
const DB = process.env.MONGO_URI

mongoose.connect(DB)
  .then(() => console.log(" Database Connected"))
  .catch(err => console.log(" DB Error:", err));


app.listen(port , () => {
  console.log(`Server running on port ${port}...`);
});


