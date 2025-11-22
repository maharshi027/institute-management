import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    studentName : {type: String, required: true},
    phone : {type: String, required: true},
    email : {type: String, required: true},
    address : {type: String, required: true},
    avatarUrl : {type: String, required: true},
    avatarId : {type: String, required: true},
    userId : {type: String, ref : "User"},
    batchId : {type: Schema.Types.ObjectId, ref: "Batch"}
},
{timestamps: true}
)

export const Student = mongoose.model("Student", studentSchema);