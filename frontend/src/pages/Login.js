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
      setError("Invalid credentials or wrong role. Please check the demo hints below.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      background: "var(--bg-page)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 460 }} className="sfv-animate">

        {/* Top branding strip */}
        <div style={{
          background: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
          borderRadius: "16px 16px 0 0",
          padding: "28px 36px 24px",
          textAlign: "center",
        }}>
          <div style={{
            width: 56, height: 56,
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, margin: "0 auto 14px",
          }}>🎓</div>
          <h2 style={{
            color: "#fff", fontSize: 22, fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans',sans-serif", margin: 0,
          }}>Sign In</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 5 }}>
            Secure Faculty Credential Verification Portal
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
          padding: "32px 36px 36px",
          boxShadow: "var(--shadow-lg)",
        }}>
          {error && <div className="sfv-alert-error mb-3">{error}</div>}

          <div className="d-flex flex-column gap-3">
            <div>
              <label className="sfv-label">Email Address</label>
              <input className="sfv-input" type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="sfv-label">Password</label>
              <input className="sfv-input" type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <div>
              <label className="sfv-label">Login As</label>
              <select className="sfv-input" value={role}
                onChange={e => setRole(e.target.value)}
                style={{ cursor: "pointer" }}>
                <option value="faculty">👤 Faculty Member</option>
                <option value="admin">🛡️ Administrator</option>
              </select>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="sfv-btn mt-2"
              style={{ width: "100%", padding: "13px", fontSize: 15 }}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 20px" }}>
            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>DEMO CREDENTIALS</span>
            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
          </div>

          <div style={{
            background: "#F8FAFF",
            border: "1px solid #DBEAFE",
            borderRadius: 10,
            padding: "14px 16px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { role: "Faculty", email: "faculty@college.edu", pass: "faculty123" },
                { role: "Admin",   email: "admin@college.edu",   pass: "admin123" },
              ].map(d => (
                <div key={d.role} style={{
                  background: "#fff", border: "1px solid #DBEAFE",
                  borderRadius: 8, padding: "10px 12px",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onClick={() => { setEmail(d.email); setPassword(d.pass); setRole(d.role.toLowerCase()); }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#2563EB"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#DBEAFE"}>
                  <div style={{ color: "#2563EB", fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", marginBottom: 4 }}>
                    {d.role.toUpperCase()}
                  </div>
                  <div style={{ color: "#475569", fontSize: 11, fontFamily: "'DM Mono',monospace", lineHeight: 1.7 }}>
                    {d.email}<br />{d.pass}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ color: "#94A3B8", fontSize: 11, textAlign: "center", marginTop: 10 }}>
              Click a card to auto-fill credentials
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
