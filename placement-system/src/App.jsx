import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import Career from "./pages/Career";
import Notifications from "./pages/Notifications";
import Statistics from "./pages/Statistics";
import Admin from "./pages/Admin";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/career" element={<Career />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
