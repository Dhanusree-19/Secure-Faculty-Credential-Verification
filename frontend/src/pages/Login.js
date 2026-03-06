import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("faculty");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const user = await loginUser(email, password, role);
      setUser(user);
      navigate(role === "admin" ? "/admin" : "/faculty");
    } catch {
      setError("Invalid credentials or wrong role. See demo hints below.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:"calc(100vh - 64px)", background:"#0f172a",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
      backgroundImage:"radial-gradient(ellipse at 30% 40%,rgba(59,130,246,0.08) 0%,transparent 60%)",
    }}>
      <div style={{ width:"100%", maxWidth:440 }}>
        <div className="sfv-card" style={{ padding:40, boxShadow:"0 24px 80px rgba(0,0,0,0.5)" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{
              width:52, height:52, background:"linear-gradient(135deg,#3b82f6,#06b6d4)",
              borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:24, margin:"0 auto 16px",
            }}>🔐</div>
            <h2 style={{ color:"#f1f5f9", fontSize:24, fontWeight:800, fontFamily:"'Sora',sans-serif", margin:0 }}>
              Welcome Back
            </h2>
            <p style={{ color:"#64748b", fontSize:14, marginTop:6 }}>Sign in to your portal</p>
          </div>

          {error && <div className="sfv-alert-error mb-3">{error}</div>}

          {/* Fields */}
          <div className="d-flex flex-column gap-3">
            <div>
              <label className="sfv-label">Email Address</label>
              <input className="sfv-input" type="email" placeholder="you@college.edu"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="sfv-label">Password</label>
              <input className="sfv-input" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            <div>
              <label className="sfv-label">Role</label>
              <select className="sfv-input" value={role} onChange={(e) => setRole(e.target.value)}
                style={{ cursor:"pointer" }}>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button onClick={handleLogin} disabled={loading} className="btn mt-2" style={{
              background: loading ? "#334155" : "linear-gradient(135deg,#3b82f6,#2563eb)",
              border:"none", color:"#fff", padding:"13px", borderRadius:9,
              fontSize:15, fontWeight:700, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 20px rgba(59,130,246,0.3)",
            }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </div>

          {/* Demo hint */}
          <div style={{
            marginTop:28, padding:14, background:"rgba(59,130,246,0.06)",
            border:"1px solid rgba(59,130,246,0.15)", borderRadius:9,
          }}>
            <div style={{ color:"#60a5fa", fontSize:12, fontWeight:700, marginBottom:6, letterSpacing:"0.08em" }}>
              🔑 DEMO CREDENTIALS
            </div>
            <div style={{ color:"#64748b", fontSize:12, lineHeight:1.8, fontFamily:"'DM Mono',monospace" }}>
              Faculty: faculty@college.edu / faculty123<br />
              Admin: &nbsp; admin@college.edu &nbsp;/ admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
