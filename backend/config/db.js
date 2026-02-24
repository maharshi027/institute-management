import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Database Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;