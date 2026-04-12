const router = require("express").Router();
const Opportunity = require("../models/Opportunity");

// get all opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate("authorId", "name company avatarUrl").sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post opportunity
router.post("/create", async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body);
    await opportunity.save();
    res.json(opportunity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
