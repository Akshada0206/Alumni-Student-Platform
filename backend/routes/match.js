const router = require("express").Router();
const User = require("../models/User");

router.get("/:studentId", async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const alumniList = await User.find({
      role: "alumni",
      profileCompleted: true
    });

    const matches = alumniList.map(alumni => {
      let score = 0;
      let maxPossibleScore = student.skills.length + student.interests.length;
      if (maxPossibleScore === 0) maxPossibleScore = 1;

      student.skills.forEach(skill => {
        const s = skill.trim().toLowerCase();
        if (s && alumni.skills.some(aSkill => aSkill.trim().toLowerCase().includes(s))) score++;
      });

      student.interests.forEach(interest => {
        const i = interest.trim().toLowerCase();
        if (i && alumni.interests.some(aInterest => aInterest.trim().toLowerCase().includes(i))) score++;
      });

      // Extra boost if career goals align
      if (student.careerGoal && alumni.profession) {
        if (student.careerGoal.toLowerCase().includes(alumni.profession.toLowerCase()) || 
            alumni.profession.toLowerCase().includes(student.careerGoal.toLowerCase())) {
          score += 2;
          maxPossibleScore += 2;
        }
      }

      const matchPercentage = Math.min(100, Math.round((score / maxPossibleScore) * 100));

      const { password, ...alumniData } = alumni._doc;
      return { ...alumniData, matchScore: score, matchPercentage };
    });

    // Sort by best match
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // Filter out alumni that have absolute 0 match with the student
    const actualMatches = matches.filter(m => m.matchPercentage > 0);

    res.json(actualMatches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;