import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

export default function StudentMentors() {
  const [matches, setMatches] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [requestTopic, setRequestTopic] = useState("");
  
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
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

  const handleSendRequest = async (alumniId) => {
     if(!requestTopic) return alert("Please enter a topic before requesting.");
     try {
       const res = await fetch("http://localhost:5000/api/request/send", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            studentId: user._id,
            alumniId,
            topic: requestTopic,
            message: "I would love to connect and get some guidance on " + requestTopic
         })
       });
       if(res.ok) {
          const newReq = await res.json();
          setMyRequests([...myRequests, newReq]);
          alert("Request sent successfully!");
          setRequestTopic("");
       } else {
          const errData = await res.json();
          alert("Error sending request: " + (errData.error || errData.message));
       }
     } catch(e) {
       console.error(e);
       alert("Network connection error");
     }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card title="Top Mentors">
          <div className="space-y-4 mt-4">
             <input 
                type="text" 
                placeholder="Need help with (e.g. Resume, AWS)..." 
                value={requestTopic}
                onChange={(e) => setRequestTopic(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500"
             />
             <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {matches.length > 0 ? matches.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex flex-col gap-2 relative">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                          {m.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">{m.name} <Badge variant="primary" className="ml-1 text-[10px]">{m.matchPercentage}% Match</Badge></p>
                          <p className="text-xs text-gray-500 truncate">{m.profession || m.company}</p>
                        </div>
                     </div>
                     <Button onClick={() => handleSendRequest(m._id)} className="w-full py-1.5 text-xs bg-white text-blue-600 border border-blue-600 hover:bg-blue-50">
                        Send Request
                     </Button>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm text-center py-4">Complete your profile to see mentors.</p>
                )}
             </div>
          </div>
       </Card>

       <Card title="My Mentorship Requests">
          <div className="space-y-3 mt-4 h-[300px] overflow-y-auto pr-1">
             {myRequests.length > 0 ? myRequests.map((req, i) => (
               <div key={i} className="p-3 rounded border border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center mb-1">
                     <span className="font-semibold text-sm">To: {req.alumniId?.name || 'Alumni'}</span>
                     <Badge variant={req.status === 'accepted' ? 'success' : req.status === 'rejected' ? 'danger' : 'warning'}>
                        {req.status}
                     </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Topic: {req.topic}</p>
                  {req.status === 'accepted' && req.meetingLink && (
                     <a href={req.meetingLink} className="text-blue-600 text-xs hover:underline">Join Meeting Link</a>
                  )}
               </div>
             )) : (
                <p className="text-gray-500 text-center text-sm py-8">You haven't requested any mentors yet.</p>
             )}
          </div>
       </Card>
    </div>
  );
}
