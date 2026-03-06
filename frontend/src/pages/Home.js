import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon:"📤", title:"Upload Credentials",  desc:"Faculty submit certificates with metadata. Tracked from submission to approval." },
  { icon:"✅", title:"Admin Verification",  desc:"Admins review, approve, or reject credentials through a streamlined workflow." },
  { icon:"🔍", title:"Public Lookup",       desc:"Anyone can verify a credential using a unique ID — no login required." },
  { icon:"📊", title:"Audit Trail",         desc:"Every action is logged for a transparent record of all credential statuses." },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight:"calc(100vh - 64px)", background:"#0f172a" }}>

      {/* ── Hero ── */}
      <div style={{
        background:"linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",
        padding:"100px 40px 80px", position:"relative", overflow:"hidden", textAlign:"center",
      }}>
        <div className="sfv-grid-bg" />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{
            display:"inline-block", background:"rgba(59,130,246,0.1)",
            border:"1px solid rgba(59,130,246,0.3)", borderRadius:20,
            padding:"6px 18px", color:"#60a5fa", fontSize:13,
            fontWeight:600, marginBottom:24, letterSpacing:"0.08em",
          }}>
            🔐 TRUSTED · TRANSPARENT · TAMPER-PROOF
          </div>

          <h1 style={{
            fontFamily:"'Sora',sans-serif", fontSize:"clamp(32px,5vw,60px)",
            fontWeight:800, color:"#f1f5f9", lineHeight:1.15,
            marginBottom:20, letterSpacing:"-0.02em",
          }}>
            Secure Faculty<br />
            <span style={{
              background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>
              Credential Verification
            </span>
          </h1>

          <p style={{ color:"#94a3b8", fontSize:18, maxWidth:560, margin:"0 auto 40px", lineHeight:1.7 }}>
            A centralised platform for colleges to manage, verify, and audit
            faculty academic and professional credentials with full transparency.
          </p>

          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => navigate("/login")} style={{
              background:"linear-gradient(135deg,#3b82f6,#2563eb)", border:"none",
              color:"#fff", padding:"14px 32px", borderRadius:10, fontSize:15,
              fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px rgba(59,130,246,0.4)",
            }}>Get Started →</button>

            <button onClick={() => navigate("/verify")} style={{
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.15)",
              color:"#e2e8f0", padding:"14px 32px", borderRadius:10,
              fontSize:15, fontWeight:600, cursor:"pointer",
            }}>Verify a Credential</button>
          </div>
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <div className="row g-4">
          {features.map((f) => (
            <div className="col-sm-6 col-lg-3" key={f.title}>
              <div className="sfv-card" style={{ padding:"28px 24px", height:"100%" }}>
                <div style={{ fontSize:36, marginBottom:16 }}>{f.icon}</div>
                <div style={{ color:"#e2e8f0", fontWeight:700, fontSize:17, marginBottom:10, fontFamily:"'Sora',sans-serif" }}>
                  {f.title}
                </div>
                <div style={{ color:"#64748b", fontSize:14, lineHeight:1.7 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
