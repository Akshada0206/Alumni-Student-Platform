import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if(res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate(data.role === "student" ? "/student-profile" : "/alumni-profile");
      } else {
        setError(data.message || "Error registering");
      }
    } catch(err) {
      console.error(err);
      setError("Server error");
    }
  }

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-4">
       <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-md border border-border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-textMain mb-1">Create an Account</h2>
            <p className="text-textMuted text-sm">Sign up as a Student or Alumni</p>
          </div>

          {error && <div className="p-3 mb-4 rounded bg-accent/10 text-accent text-center text-sm border border-accent/20">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-2">
               <button 
                  type="button"
                  onClick={() => setForm({...form, role: "student"})}
                  className={`py-2 rounded-lg text-sm font-medium border ${form.role === 'student' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-textMuted bg-background'}`}
               >
                 Student
               </button>
               <button 
                  type="button"
                  onClick={() => setForm({...form, role: "alumni"})}
                  className={`py-2 rounded-lg text-sm font-medium border ${form.role === 'alumni' ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-textMuted bg-background'}`}
               >
                 Alumni
               </button>
            </div>

            <div className="space-y-3">
               <div>
                  <label className="text-sm font-medium text-textMain">Full Name</label>
                  <input 
                     type="text" 
                     value={form.name}
                     onChange={(e) => setForm({...form, name: e.target.value})}
                     className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-textMain focus:border-primary mt-1"
                     required
                  />
               </div>
               <div>
                  <label className="text-sm font-medium text-textMain">Email</label>
                  <input 
                     type="email" 
                     value={form.email}
                     onChange={(e) => setForm({...form, email: e.target.value})}
                     className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-textMain focus:border-primary mt-1"
                     required
                  />
               </div>
               <div>
                  <label className="text-sm font-medium text-textMain">Password</label>
                  <input 
                     type="password" 
                     value={form.password}
                     onChange={(e) => setForm({...form, password: e.target.value})}
                     className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-textMain focus:border-primary mt-1"
                     required
                  />
               </div>
            </div>

            <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primaryHover mt-4">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-textMuted">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
       </div>
    </div>
  );
}