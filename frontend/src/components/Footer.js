import React from "react";

const Footer = () => (
  <footer className="sfv-footer">
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{
        width:28, height:28, background:"linear-gradient(135deg,#3b82f6,#06b6d4)",
        borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14,
      }}>🎓</div>
      <span style={{ color:"#475569", fontSize:13, fontFamily:"'Sora',sans-serif", fontWeight:600 }}>
        SecureVerify
      </span>
    </div>

    <div style={{ color:"#334155", fontSize:13 }}>
      © {new Date().getFullYear()} Secure Faculty Credential Verification Platform
    </div>

    <div style={{ display:"flex", gap:20 }}>
      {["Privacy Policy","Terms of Use","Support"].map((l) => (
        <span key={l} style={{ color:"#475569", fontSize:12, cursor:"pointer" }}
          onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
          onMouseLeave={(e) => (e.target.style.color = "#475569")}>
          {l}
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
