import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "📤", title: "Upload Credentials",  desc: "Faculty submit certificates with metadata. All documents tracked from submission to approval." },
  { icon: "✅", title: "Admin Verification",  desc: "Admins review, approve, or reject credentials through a streamlined verification workflow." },
  { icon: "🔍", title: "Public Lookup",       desc: "Anyone can verify a credential using a unique Credential ID — no login required." },
  { icon: "📊", title: "Audit Trail",         desc: "Every action is logged for a transparent record of all credential statuses and changes." },
];

const steps = [
  { num: "01", label: "Faculty Uploads",    desc: "Submit certificates with supporting documents." },
  { num: "02", label: "Admin Reviews",      desc: "Admin team verifies document authenticity." },
  { num: "03", label: "Status Updated",     desc: "Faculty notified of Verified or Rejected status." },
  { num: "04", label: "Public Searchable",  desc: "Credential becomes publicly verifiable by ID." },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "var(--bg-page)", minHeight: "calc(100vh - 64px)" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)",
        padding: "90px 40px 80px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        <div className="sfv-dot-bg" style={{ opacity: 0.6 }} />

        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 300, height: 300,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -40,
          width: 240, height: 240,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }} />

        <div style={{ position: "relative", zIndex: 1 }} className="sfv-animate">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 20, padding: "6px 18px",
            color: "#fff", fontSize: 12, fontWeight: 700,
            marginBottom: 28, letterSpacing: "0.1em",
          }}>
            🔐 TRUSTED · TRANSPARENT · TAMPER-PROOF
          </div>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(30px, 5vw, 56px)",
            fontWeight: 800, color: "#fff",
            lineHeight: 1.15, marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            Secure Faculty<br />
            <span style={{ color: "#BFDBFE" }}>Credential Verification</span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.80)", fontSize: 18,
            maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.7,
          }}>
            A centralised platform for universities to manage, verify, and audit faculty
            academic and professional credentials with full transparency.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/login")} style={{
              background: "#fff", border: "none",
              color: "#2563EB", padding: "14px 32px",
              borderRadius: 10, fontSize: 15, fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}>
              Get Started →
            </button>
            <button onClick={() => navigate("/verify")} style={{
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: "#fff", padding: "14px 32px",
              borderRadius: 10, fontSize: 15, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              Verify a Credential
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        padding: "24px 40px",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
          gap: 24, textAlign: "center",
        }}>
          {[
            { val: "500+", label: "Faculty Members" },
            { val: "2,400+", label: "Credentials Verified" },
            { val: "98%", label: "Accuracy Rate" },
            { val: "24hr", label: "Avg. Review Time" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ color: "#2563EB", fontSize: 26, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {s.val}
              </div>
              <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div style={{ padding: "72px 40px 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="sfv-section-tag">Platform Features</div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: 32, fontWeight: 800,
            color: "#0F172A", marginTop: 8,
          }}>
            Everything you need to manage credentials
          </h2>
        </div>
        <div className="row g-4">
          {features.map((f, i) => (
            <div className={`col-sm-6 col-lg-3 sfv-animate sfv-animate-${i+1}`} key={f.title}>
              <div className="sfv-card sfv-card-hover" style={{ padding: "28px 24px", height: "100%" }}>
                <div style={{
                  width: 48, height: 48,
                  background: "var(--primary-pale)",
                  border: "1px solid var(--primary-soft)",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <div style={{
                  color: "#0F172A", fontWeight: 700, fontSize: 16,
                  marginBottom: 10, fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}>
                  {f.title}
                </div>
                <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7 }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div style={{
        background: "#fff",
        padding: "72px 40px",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="sfv-section-tag">How It Works</div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: 30, fontWeight: 800, color: "#0F172A", marginTop: 8,
            }}>
              Simple 4-step process
            </h2>
          </div>
          <div className="row g-4">
            {steps.map((s, i) => (
              <div className="col-sm-6 col-lg-3" key={s.num}>
                <div style={{ textAlign: "center", padding: "0 12px" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "var(--primary-pale)",
                    border: "2px solid var(--primary-soft)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                    fontFamily: "'DM Mono',monospace",
                    color: "#2563EB", fontSize: 15, fontWeight: 700,
                  }}>{s.num}</div>
                  <div style={{ color: "#0F172A", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: "72px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="sfv-section-tag">Get Started</div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: 30, fontWeight: 800, color: "#0F172A", margin: "12px 0 16px",
          }}>
            Ready to verify credentials?
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            Login as Faculty to submit credentials, or as Admin to review and approve them.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/login")} className="sfv-btn" style={{ padding: "14px 36px", fontSize: 15 }}>
              Login to Portal
            </button>
            <button onClick={() => navigate("/verify")} className="sfv-btn-outline" style={{ padding: "14px 32px", fontSize: 15 }}>
              Verify Credential
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
