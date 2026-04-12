const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, enum: ["internship", "job", "webinar"], required: true },
  location: { type: String },
  link: { type: String },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);
