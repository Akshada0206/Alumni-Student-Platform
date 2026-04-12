const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    
    const existing = await User.findOne({ email: data.email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(data.password, 10);

    const user = new User({
      ...data,
      password: hashed,
      points: data.role === 'student' ? 10 : 50
    });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESET PASSWORD (FORGOT PASSWORD)
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password reset successfully. You can now login." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PROFILE (STUDENT + ALUMNI)
router.post("/update-profile/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profileCompleted: true },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;