import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyCredential from "./pages/VerifyCredential";

import "./styles/main.css";

/* Redirects unauthenticated or wrong-role users */
const ProtectedRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/admin" : "/faculty"}
                replace
              />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
        <Route path="/verify" element={<VerifyCredential />} />

        {/* Protected – Faculty */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute user={user} role="faculty">
              <FacultyDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Protected – Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
