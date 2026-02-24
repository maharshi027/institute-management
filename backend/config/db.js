import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const DB_URI = process.env.MONGO_URI;
    
    // if (!DB_URI) {
    //   throw new Error("MONGO_URI is not defined in environment variables");
    // }
    
    const db = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Database Connected: successfully... ${db.connection.host}`);
  } catch (error) {
    console.error(`Data Base Connection Failed : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;