import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: './.env'
});

mongoose.connect('mongodb+srv://albatross25:Kirti123@cluster1.r1jemfh.mongodb.net/?appName=Cluster1')
  .then(() => console.log(" Database Connected"))
  .catch(err => console.log(" DB Error:", err));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


