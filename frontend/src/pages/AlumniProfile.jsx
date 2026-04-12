import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { PlusCircle, Trash2 } from "lucide-react";

export default function AlumniProfile() {
  const [form, setForm] = useState({
    company: "",
    profession: "",
    experience: "",
    skills: "",
    interests: "",
  });
  const [timeline, setTimeline] = useState([]);
  
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.profileCompleted) {
      setForm({
        company: user.company || "",
        profession: user.profession || "",
        experience: user.experience || "",
        skills: user.skills ? user.skills.join(", ") : "",
        interests: user.interests ? user.interests.join(", ") : "",
      });
      if (user.timeline) setTimeline(user.timeline);
    }
  }, []);

  const handleAddTimeline = () => {
     setTimeline([...timeline, { title: "", company: "", year: "", description: "" }]);
  };

  const saveProfile = async () => {
    const skillsArray = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const interestsArray = form.interests.split(",").map((i) => i.trim()).filter(Boolean);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/update-profile/${user._id}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            ...form,
            skills: skillsArray,
            interests: interestsArray,
            timeline
         })
      });
      const data = await res.json();
      if(res.ok) {
         localStorage.setItem("user", JSON.stringify(data));
         alert("Profile updated successfully!");
         nav("/alumni");
      }
    } catch {
      alert("Error saving profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Card title="Alumni Profile Details">
         <div className="space-y-5 mt-4">
            <div>
               <h2 className="text-xl font-bold">{user?.name}</h2>
               <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <input
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                 <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
                    placeholder="Job Title"
                    value={form.profession}
                    onChange={e => setForm({ ...form, profession: e.target.value })}
                  />
                </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Skills</label>
              <input
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
                placeholder="React, Java, Management"
                value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })}
              />
            </div>

            {/* Timeline Section */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Career History</h3>
                    <button type="button" onClick={handleAddTimeline} className="text-sm text-blue-600 flex items-center hover:underline">
                       <PlusCircle className="w-4 h-4 mr-1" /> Add Job
                    </button>
                 </div>

                 <div className="space-y-3">
                     {timeline.map((step, i) => (
                        <div key={i} className="flex gap-3 bg-white p-3 rounded border border-gray-200">
                             <div className="flex-1 space-y-2">
                                  <div className="grid grid-cols-2 gap-2">
                                     <input 
                                        placeholder="Title" 
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        value={step.title}
                                        onChange={(e) => { const nt = [...timeline]; nt[i].title = e.target.value; setTimeline(nt); }}
                                     />
                                     <input 
                                        placeholder="Company" 
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        value={step.company}
                                        onChange={(e) => { const nt = [...timeline]; nt[i].company = e.target.value; setTimeline(nt); }}
                                     />
                                  </div>
                                  <input 
                                     placeholder="Year (e.g. 2020-2022)" 
                                     className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                     value={step.year}
                                     onChange={(e) => { const nt = [...timeline]; nt[i].year = e.target.value; setTimeline(nt); }}
                                  />
                             </div>
                             <button onClick={() => setTimeline(timeline.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                             </button>
                        </div>
                     ))}
                     {timeline.length === 0 && <p className="text-sm text-gray-500 text-center">Add your past jobs here.</p>}
                 </div>
            </div>

            <Button onClick={saveProfile} className="w-full py-2 bg-blue-600 hover:bg-blue-700 mt-4 text-white">
              Save Profile
            </Button>
         </div>
      </Card>
    </div>
  );
}