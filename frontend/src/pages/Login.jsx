import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setIsForgotPassword(false);
          setPassword("");
        } else {
          setMessage(data.message || "Error resetting password");
        }
      } catch (error) {
        console.error(error);
      }
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate(data.role === "student" ? "/student" : "/alumni");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-4">
       <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-md border border-border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-textMain mb-1">
              {isForgotPassword ? "Reset Password" : "Login to AlumNetX"}
            </h2>
            <p className="text-textMuted text-sm">
              {isForgotPassword ? "Enter your email to set a new password." : "Welcome back! Please enter your details."}
            </p>
          </div>

          {message && <div className="p-3 mb-4 rounded bg-primary/10 text-primary text-center text-sm border border-primary/20">{message}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-textMain">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-textMain focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="space-y-1">
               <label className="text-sm font-medium text-textMain">
                 {isForgotPassword ? "New Password" : "Password"}
               </label>
               <input 
                  type="password" 
                  value={isForgotPassword ? newPassword : password}
                  onChange={(e) => isForgotPassword ? setNewPassword(e.target.value) : setPassword(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-textMain focus:outline-none focus:border-primary"
                  required
                />
            </div>

            {!isForgotPassword && (
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsForgotPassword(true)} className="text-sm text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primaryHover transition-colors mt-2">
              {isForgotPassword ? "Reset" : "Login"} 
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-textMuted">
            {isForgotPassword ? (
              <button type="button" onClick={() => setIsForgotPassword(false)} className="text-primary hover:underline">
                Back to Login
              </button>
            ) : (
              <p>
                Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
              </p>
            )}
          </div>
       </div>
    </div>
  );
}