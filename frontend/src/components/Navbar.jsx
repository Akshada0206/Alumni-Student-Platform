import { Bell, Search } from "lucide-react";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', points: 0 };

  return (
    <div className="h-20 bg-surface/50 backdrop-blur-md border-b border-border flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="flex bg-surfaceHover rounded-full px-4 py-2 w-96 border border-border focus-within:border-primary transition-colors">
        <Search className="w-5 h-5 text-textMuted" />
        <input 
          type="text" 
          placeholder="Search mentors, jobs, events..." 
          className="bg-transparent border-none outline-none text-textMain ml-3 w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
          <span>🎯</span> {user.points || 0} pts
        </div>
        <button className="relative text-textMuted hover:text-textMain transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-surface"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-border pl-6">
          <div className="text-right">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-textMuted capitalize">{user.role}</p>
          </div>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full border border-border object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}