import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function AlumniDashboard() {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Alumni', company: 'Google' };

  useEffect(() => {
    if (user._id) {
       fetch(`http://localhost:5000/api/request/alumni/${user._id}`)
         .then(res => res.json())
         .then(d => setRequests(d))
         .catch(e => console.error(e));
    }
  }, [user._id]);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border p-6 rounded-xl flex justify-between items-center shadow-sm">
         <div>
            <h1 className="text-2xl font-bold text-textMain mb-1">Welcome back, {user.name}</h1>
            <p className="text-textMuted text-sm">Check your pending mentorship requests below.</p>
         </div>
         <div className="flex gap-4">
             <div className="text-center px-4 border-r border-border">
                <h3 className="text-2xl font-bold text-textMain">{pendingRequests.length}</h3>
                <p className="text-xs text-textMuted uppercase">Pending</p>
             </div>
             <div className="text-center px-4">
                <h3 className="text-2xl font-bold text-green-600">{acceptedRequests.length}</h3>
                <p className="text-xs text-textMuted uppercase">Mentees</p>
             </div>
         </div>
      </div>
      <Card title="My Mentees (Accepted Requests)" className="mt-6">
         <div className="space-y-3 mt-4 max-h-[500px] overflow-y-auto">
             {acceptedRequests.length > 0 ? acceptedRequests.map(r => (
                <div key={r._id} className="p-3 bg-gray-50 border border-gray-200 rounded flex justify-between items-center">
                   <div>
                      <p className="font-semibold text-sm text-gray-800">{r.studentId?.name || 'Student'}</p>
                      <p className="text-xs text-gray-500">{r.topic}</p>
                   </div>
                   <a 
                      href={`mailto:${r.studentId?.email || ''}?subject=Mentorship%20Connect`}
                      className="px-3 py-1 text-xs bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 rounded text-center inline-block"
                   >
                      Email Mentee
                   </a>
                </div>
             )) : (
                 <p className="text-sm text-gray-500 text-center py-8">You have not accepted any mentees yet.</p>
             )}
         </div>
      </Card>
    </div>
  );
}