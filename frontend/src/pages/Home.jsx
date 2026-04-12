import { Link } from "react-router-dom";
import { ArrowRight, Users, Briefcase, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 bg-surface border-b border-border flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">A</div>
             <span className="text-xl font-bold text-primary">AlumNetX</span>
         </div>
         <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 text-primary font-medium hover:bg-primary/10 rounded-lg">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-primary text-white font-medium hover:bg-primaryHover rounded-lg">Sign Up</Link>
         </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-24 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-textMain mb-6">
            Connect with Alumni. <br/>
            <span className="text-primary">Boost your Career.</span>
          </h1>
          
          <p className="text-lg text-textMuted mb-10 max-w-2xl leading-relaxed">
            AlumNetX helps students find mentors, review resumes, and discover opportunities from previous graduates working in top companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Link to="/register" className="px-6 py-3 bg-primary text-white font-bold text-lg rounded-lg shadow-md hover:bg-primaryHover flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
             </Link>
          </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
           <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-textMain mb-2">Smart Matching</h3>
              <p className="text-textMuted text-sm">Find mentors with the exact skills and experience you are looking for.</p>
           </div>
           <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
              <MessageSquare className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-lg font-bold text-textMain mb-2">1-on-1 Mentorship</h3>
              <p className="text-textMuted text-sm">Schedule sessions for resume reviews, mock interviews, and general advice.</p>
           </div>
           <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
              <Briefcase className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-textMain mb-2">Job Opportunities</h3>
              <p className="text-textMuted text-sm">Discover exclusive internships and full-time roles posted by alumni.</p>
           </div>
        </div>
      </main>
    </div>
  );
}