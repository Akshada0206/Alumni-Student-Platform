const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "alumni"], required: true },
  avatarUrl: { type: String, default: "" },

  skills: [String],
  interests: [String],
  careerGoal: String,

  company: String,
  experience: String,
  profession: String,
  
  // Alumni Specific:
  isVerified: { type: Boolean, default: false },
  timeline: [
    {
      title: String,
      company: String,
      year: String,
      description: String
    }
  ],

  // Gamification
  points: { type: Number, default: 0 },
  badges: [String],

  profileCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);