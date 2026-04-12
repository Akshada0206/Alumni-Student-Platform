import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, Calendar, User, LogOut, Search } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || { role: 'student' };
  
  const navItems = user.role === 'student' ? [
    { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { name: "Mentors", path: "/student/mentors", icon: Users },
    { name: "Opportunities", path: "/student/opportunities", icon: Briefcase },
    { name: "Profile", path: "/student-profile", icon: User },
  ] : [
    { name: "Dashboard", path: "/alumni", icon: LayoutDashboard },
    { name: "Mentorship Requests", path: "/alumni/requests", icon: Users },
    { name: "Post Opportunity", path: "/alumni/opportunities", icon: Briefcase },
    { name: "Profile", path: "/alumni-profile", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="w-64 bg-surface border-r border-border flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/30">
          A
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AlumNetX
        </h2>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                ? "bg-primary/10 text-primary" 
                : "text-textMuted hover:bg-surfaceHover hover:text-textMain"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-primary" : ""}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-accent hover:bg-accent/10 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}