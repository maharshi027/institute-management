import mongoose, { Schema } from "mongoose";

const feeSchema = new Schema({
    paidBy: { type: String, required: true},
    phone : {type:String, required: true},
    batchId : {type: String, required: true},
    userId : {type: String, required: true},
    amount : {type: Number, required: true},
    remarks: {type: String, required: true}
},
{timestamps: true})

export const Fee = mongoose.model("Fee", feeSchema);