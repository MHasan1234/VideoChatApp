import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  user_id: {
  type: mongoose.Schema.Types.ObjectId, // store MongoDB _id
  ref: "User",
  required: true,
},
  meetingCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Meeting = mongoose.model("Meeting", meetingSchema);
