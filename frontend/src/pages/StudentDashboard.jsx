import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { Users, Briefcase, Calendar, Star } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function StudentDashboard() {
  const [data, setData] = useState({ topCompanies: [], trendingSkills: [] });
  const [matches, setMatches] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Student', skills: ['React', 'Node.js'], careerGoal: 'Software Engineer' };

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics")
      .then(res => res.json())
      .then(d => setData(d))
      .catch(e => console.error(e));

    fetch("http://localhost:5000/api/opportunity")
      .then(res => res.json())
      .then(d => setOpportunities(d))
      .catch(e => console.error(e));

    if (user._id) {
       fetch(`http://localhost:5000/api/match/${user._id}`)
         .then(res => res.json())
         .then(d => setMatches(d))
         .catch(e => console.error(e));
         
       fetch(`http://localhost:5000/api/request/student/${user._id}`)
         .then(res => res.json())
         .then(d => setMyRequests(d))
         .catch(e => console.error(e));
    }
  }, [user._id]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end bg-surface p-6 rounded-xl border border-border shadow-sm">
        <div>
           <h1 className="text-2xl font-bold text-textMain mb-1">Hello, {user.name}!</h1>
           <p className="text-textMuted text-sm">Welcome to your student dashboard. Check your insights and stats below.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
         <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-textMuted font-medium uppercase tracking-wider">Requests</p>
              <h3 className="text-xl font-bold text-textMain">{myRequests.length}</h3>
            </div>
         </Card>
         <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-textMuted font-medium uppercase tracking-wider">Jobs</p>
              <h3 className="text-xl font-bold text-textMain">{opportunities.length}</h3>
            </div>
         </Card>
         <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-textMuted font-medium uppercase tracking-wider">Sessions</p>
              <h3 className="text-xl font-bold text-textMain">{myRequests.filter(r => r.status === 'accepted').length}</h3>
            </div>
         </Card>
         <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center rounded-lg text-yellow-600">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-textMuted font-medium uppercase tracking-wider">Matches</p>
              <h3 className="text-xl font-bold text-textMain">{matches.length}</h3>
            </div>
         </Card>
      </div>

      <div className="mt-6">
         <Card title="Analytics Insights">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                   <h4 className="text-sm font-semibold text-gray-800 mb-3">Trending Skills in Demand</h4>
                   <div className="space-y-3">
                      {data?.trendingSkills?.length > 0 ? data.trendingSkills.map((skill, i) => (
                         <div key={i} className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-100">
                            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                            <Badge variant="primary">{skill.count} Students Learning</Badge>
                         </div>
                      )) : (
                         <p className="text-xs text-gray-500">Not enough data to show insights yet.</p>
                      )}
                   </div>
               </div>

               <div>
                   <h4 className="text-sm font-semibold text-gray-800 mb-3">Top Hiring Companies</h4>
                   <div className="flex flex-wrap gap-2">
                      {data?.topCompanies?.length > 0 ? data.topCompanies.map((company, i) => (
                         <span key={i} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                            {company.name} ({company.count})
                         </span>
                      )) : (
                         <p className="text-xs text-gray-500">Not enough data available.</p>
                      )}
                   </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}