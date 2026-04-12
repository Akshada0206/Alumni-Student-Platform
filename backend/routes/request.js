const router = require("express").Router();
const Request = require("../models/Request");

// send request
router.post("/send", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get alumni requests
router.get("/alumni/:alumniId", async (req, res) => {
  try {
    const requests = await Request.find({ alumniId: req.params.alumniId }).populate("studentId", "name email skills interests careerGoal avatarUrl profileCompleted").sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get student requests
router.get("/student/:studentId", async (req, res) => {
  try {
    const requests = await Request.find({ studentId: req.params.studentId }).populate("alumniId", "name email profession company avatarUrl").sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// accept/reject
router.post("/update/:id", async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, meetingLink: req.body.meetingLink },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;