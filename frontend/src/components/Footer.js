import React from "react";

const Footer = () => (
  <footer className="sfv-footer">
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 28, height: 28,
        background: "linear-gradient(135deg,#2563EB,#3B82F6)",
        borderRadius: 7,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
      }}>🎓</div>
      <span style={{
        color: "#1D4ED8", fontSize: 14,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
      }}>SecureVerify</span>
    </div>

    <div style={{ color: "#94A3B8", fontSize: 13 }}>
      © {new Date().getFullYear()} Secure Faculty Credential Verification Platform · All rights reserved
    </div>

    <div style={{ display: "flex", gap: 20 }}>
      {["Privacy Policy", "Terms of Use", "Support"].map((l) => (
        <span key={l} style={{
          color: "#94A3B8", fontSize: 13, cursor: "pointer",
          transition: "color 0.15s",
        }}
        onMouseEnter={e => e.target.style.color = "#2563EB"}
        onMouseLeave={e => e.target.style.color = "#94A3B8"}>
          {l}
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
