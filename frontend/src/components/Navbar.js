import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isActive  = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    background:  isActive(path) ? "rgba(59,130,246,0.15)" : "transparent",
    border:      isActive(path) ? "1px solid rgba(59,130,246,0.4)" : "1px solid transparent",
    color:       isActive(path) ? "#60a5fa" : "#94a3b8",
    padding:     "6px 16px",
    borderRadius: 7,
    cursor:      "pointer",
    fontSize:    14,
    fontWeight:  500,
    textDecoration: "none",
    transition:  "all 0.15s",
    display:     "inline-block",
  });

  const handleLogout = () => { setUser(null); navigate("/"); };

  return (
    <nav style={{
      background: "#0f172a", borderBottom: "1px solid #1e3a5f",
      padding: "0 32px", display: "flex", alignItems: "center",
      height: 64, position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, marginRight:40, textDecoration:"none" }}>
        <div style={{
          width:36, height:36, background:"linear-gradient(135deg,#3b82f6,#06b6d4)",
          borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
        }}>🎓</div>
        <div>
          <div style={{ color:"#f1f5f9", fontWeight:800, fontSize:15, fontFamily:"'Sora',sans-serif", lineHeight:1.1 }}>
            SecureVerify
          </div>
          <div style={{ color:"#64748b", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Faculty Credentials
          </div>
        </div>
      </Link>

      {/* Links */}
      <div style={{ display:"flex", gap:4, flex:1 }}>
        <Link to="/"       style={linkStyle("/")}>Home</Link>
        {!user && <Link to="/login"  style={linkStyle("/login")}>Login</Link>}
        <Link to="/verify" style={linkStyle("/verify")}>Verify Credential</Link>
      </div>

      {/* User chip */}
      {user && (
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{user.name}</div>
            <div style={{ color:"#3b82f6", fontSize:11, textTransform:"capitalize" }}>{user.role}</div>
          </div>
          <div style={{
            width:36, height:36, borderRadius:"50%",
            background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", fontWeight:700, fontSize:14,
          }}>{user.name[0]}</div>
          <button onClick={handleLogout} style={{
            background:"transparent", border:"1px solid #334155",
            color:"#94a3b8", padding:"6px 14px", borderRadius:7,
            cursor:"pointer", fontSize:13,
          }}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
