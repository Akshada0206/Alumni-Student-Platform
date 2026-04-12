const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const alumni = await User.find({ role: "alumni", profileCompleted: true });
    const students = await User.find({ role: "student", profileCompleted: true });

    // Top hiring companies
    const companyCounts = {};
    alumni.forEach(a => {
        if(a.company) {
            companyCounts[a.company] = (companyCounts[a.company] || 0) + 1;
        }
    });
    const topCompanies = Object.entries(companyCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a,b) => b.count - a.count)
        .slice(0, 5);

    // Trending skills based on students
    const skillCounts = {};
    students.forEach(s => {
        s.skills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
    });
    const trendingSkills = Object.entries(skillCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a,b) => b.count - a.count)
        .slice(0, 5);

    res.json({
        totalAlumni: alumni.length,
        totalStudents: students.length,
        topCompanies,
        trendingSkills
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
