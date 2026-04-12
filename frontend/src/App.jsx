import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import DashboardLayout from "./layouts/DashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import StudentMentors from "./pages/StudentMentors";
import StudentOpportunities from "./pages/StudentOpportunities";
import AlumniDashboard from "./pages/AlumniDashboard";
import AlumniRequests from "./pages/AlumniRequests";
import AlumniOpportunities from "./pages/AlumniOpportunities";
import StudentProfile from "./pages/StudentProfile";
import AlumniProfile from "./pages/AlumniProfile";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
         style: { background: '#1E293B', color: '#fff', borderRadius: '12px', border: '1px solid #334155' }
      }}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/alumni-profile" element={<AlumniProfile />} />

        <Route element={<DashboardLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/mentors" element={<StudentMentors />} />
          <Route path="/student/opportunities" element={<StudentOpportunities />} />
          
          <Route path="/alumni" element={<AlumniDashboard />} />
          <Route path="/alumni/requests" element={<AlumniRequests />} />
          <Route path="/alumni/opportunities" element={<AlumniOpportunities />} />
          
          {/* Default fallbacks */}
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/alumni/*" element={<AlumniDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;