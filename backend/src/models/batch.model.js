import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema({
  batchName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  startingDate: { type: String, required: true },
  endDate: { type: String, required: true },
  thumbnailUrl: { type: String, required: true }, 
  imageId: { type: String, required: true },       
  userId: { type: Schema.Types.ObjectId, ref: "User" }
},{
  timestamps: true
}
);

export const Batch = mongoose.model("Batch", batchSchema);
