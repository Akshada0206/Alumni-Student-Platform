const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true },
  message: { type: String },
  date: { type: Date },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending"
  },
  meetingLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);