import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Briefcase } from "lucide-react";

export default function StudentOpportunities() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/opportunity")
      .then(res => res.json())
      .then(d => setOpportunities(d))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="space-y-6">
      <Card title="Recent Opportunities">
        <div className="mt-4 space-y-3 h-[500px] overflow-y-auto pr-2">
           {opportunities.length > 0 ? opportunities.map((opp, i) => (
              <div key={i} className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-sm transition-shadow">
                 <div>
                    <h4 className="text-md font-bold text-textMain">{opp.title}</h4>
                    <p className="text-sm text-textMuted">{opp.company} • {opp.type}</p>
                    <p className="text-xs text-gray-400 mt-1">Posted by {opp.authorId?.name || 'Alumni'} • {new Date(opp.createdAt).toLocaleDateString()}</p>
                 </div>
                 <a 
                    href={opp.link?.startsWith('http') ? opp.link : `https://${opp.link}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded text-sm font-medium hover:bg-blue-100 text-center whitespace-nowrap"
                 >
                    Apply Now
                 </a>
              </div>
           )) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                 <Briefcase className="w-10 h-10 text-gray-400 mb-4" />
                 <h4 className="text-lg font-bold text-gray-700 mb-1">No opportunities yet</h4>
                 <p className="text-gray-500 text-sm max-w-sm mb-4">Check back later for exciting jobs and webinars posted by our alumni.</p>
              </div>
           )}
        </div>
      </Card>
    </div>
  );
}
