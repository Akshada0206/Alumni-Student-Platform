import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

export default function AlumniRequests() {
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

  const updateRequest = async (id, status) => {
     try {
        const res = await fetch(`http://localhost:5000/api/request/update/${id}`, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ status })
        });
        if(res.ok) {
           setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
        }
     } catch (e) {
        console.error(e);
     }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <Card title="Pending Mentorship Requests">
        <div className="space-y-3 mt-4 overflow-y-auto pr-2">
            {pendingRequests.length > 0 ? pendingRequests.map((r) => (
               <div key={r._id} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                      <div>
                          <p className="font-semibold text-gray-800 text-sm">{r.studentId?.name || 'Student'}</p>
                          <p className="text-xs text-gray-500">Topic: {r.topic || 'General Guidance'}</p>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                  </div>
                  {r.message && <p className="text-sm text-gray-600 mb-3 bg-white p-2 rounded border border-gray-100 italic">"{r.message}"</p>}
                  
                  <div className="flex gap-2 mt-3">
                      <Button onClick={() => updateRequest(r._id, 'accepted')} className="py-1.5 px-3 text-xs bg-green-600 hover:bg-green-700">Accept</Button>
                      <Button onClick={() => updateRequest(r._id, 'rejected')} variant="outline" className="py-1.5 px-3 text-xs text-red-600 border-red-600 hover:bg-red-50">Decline</Button>
                  </div>
               </div>
            )) : (
                <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm">No new requests right now.</p>
                </div>
            )}
        </div>
    </Card>
  );
}
