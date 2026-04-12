import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function AlumniOpportunities() {
  const [opportunityForm, setOpportunityForm] = useState({ title: "", company: "", type: "Internship", link: "" });
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Alumni', company: 'Google' };

  const handlePostOpportunity = async (e) => {
     e.preventDefault();
     if(!opportunityForm.title || !opportunityForm.link) return alert("Title and link are required");
     
     try {
         const res = await fetch("http://localhost:5000/api/opportunity/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                authorId: user._id,
                ...opportunityForm
            })
         });
         if(res.ok) {
            alert("Opportunity shared with students!");
            setOpportunityForm({ title: "", company: "", type: "Internship", link: "" });
         }
     } catch (e) {
         console.error(e);
     }
  };

  return (
    <Card title="Post an Opportunity">
        <form onSubmit={handlePostOpportunity} className="space-y-3 mt-4">
            <input 
                required 
                placeholder="Job Title (e.g. SDE Intern)" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500" 
                value={opportunityForm.title} onChange={e => setOpportunityForm({...opportunityForm, title: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-3">
                <input 
                    placeholder="Company" 
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500" 
                    value={opportunityForm.company} onChange={e => setOpportunityForm({...opportunityForm, company: e.target.value})}
                />
                <select 
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500"
                    value={opportunityForm.type} onChange={e => setOpportunityForm({...opportunityForm, type: e.target.value})}
                >
                   <option>Internship</option>
                   <option>Full-Time</option>
                   <option>Webinar</option>
                </select>
            </div>
            <input 
                required 
                placeholder="Application Link" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500" 
                value={opportunityForm.link} onChange={e => setOpportunityForm({...opportunityForm, link: e.target.value})}
            />
            <Button type="submit" className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700">Share with Students</Button>
        </form>
    </Card>
  );
}
