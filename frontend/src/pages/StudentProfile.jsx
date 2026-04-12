import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function StudentProfile() {
  const [form, setForm] = useState({
    skills: "",
    interests: "",
    careerGoal: "",
  });
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.profileCompleted) {
      setForm({
        skills: user.skills ? user.skills.join(", ") : "",
        interests: user.interests ? user.interests.join(", ") : "",
        careerGoal: user.careerGoal || ""
      });
    }
  }, []);

  const saveProfile = async () => {
    const skillsArray = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const interestsArray = form.interests.split(",").map((i) => i.trim()).filter(Boolean);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/update-profile/${user._id}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            skills: skillsArray,
            interests: interestsArray,
            careerGoal: form.careerGoal
         })
      });
      const data = await res.json();
      if(res.ok) {
         localStorage.setItem("user", JSON.stringify(data));
         alert("Profile updated successfully!");
         nav("/student");
      }
    } catch {
      alert("Error saving profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card title="Student Profile Details">
         <div className="space-y-5 mt-4">
            <div>
               <p className="text-sm text-gray-500 mb-1">Name</p>
               <h3 className="font-semibold text-lg">{user?.name}</h3>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Skills (comma separated)</label>
              <textarea
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="React, Java, UI Design"
                value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Interests</label>
              <textarea
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Web Development, Startups"
                value={form.interests}
                onChange={e => setForm({ ...form, interests: e.target.value })}
              />
            </div>

             <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Career Goal</label>
              <input
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Software Engineer"
                value={form.careerGoal}
                onChange={e => setForm({ ...form, careerGoal: e.target.value })}
              />
            </div>

            <Button onClick={saveProfile} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mt-4">
              Save Profile
            </Button>
         </div>
      </Card>
    </div>
  );
}