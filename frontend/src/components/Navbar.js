import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => { setUser(null); navigate("/"); };

  return (
    <nav style={{
      background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #3B82F6 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      padding: "0 32px",
      height: 64,
      display: "flex",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 16px rgba(37,99,235,0.25)",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 40, textDecoration: "none" }}>
        <div style={{
          width: 36, height: 36,
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>🎓</div>
        <div>
          <div style={{
            color: "#fff", fontWeight: 800, fontSize: 15,
            fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1,
          }}>
            SecureVerify
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Faculty Credentials
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {[
          { to: "/",       label: "Home" },
          { to: "/verify", label: "Verify Credential" },
        ].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            background: isActive(to) ? "rgba(255,255,255,0.2)" : "transparent",
            border: isActive(to) ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
            color: "#fff",
            padding: "6px 16px",
            borderRadius: 7,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: isActive(to) ? 700 : 500,
            textDecoration: "none",
            transition: "all 0.15s",
            opacity: isActive(to) ? 1 : 0.85,
          }}
          onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
          onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.background = "transparent"; }}>
            {label}
          </Link>
        ))}
        {!user && (
          <Link to="/login" style={{
            background: isActive("/login") ? "rgba(255,255,255,0.2)" : "transparent",
            border: isActive("/login") ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
            color: "#fff", padding: "6px 16px", borderRadius: 7,
            fontSize: 14, fontWeight: isActive("/login") ? 700 : 500,
            textDecoration: "none", transition: "all 0.15s", opacity: isActive("/login") ? 1 : 0.85,
          }}>Login</Link>
        )}
      </div>

      {/* User Chip */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, textTransform: "capitalize" }}>
              {user.role}
            </div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 14,
          }}>
            {user.name[0]}
          </div>
          <button onClick={handleLogout} style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff", padding: "7px 16px", borderRadius: 7,
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;