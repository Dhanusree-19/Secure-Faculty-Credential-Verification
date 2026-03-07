import React, { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { verifyCredentialById } from "../services/api";

const VerifyCredential = () => {
  const [credId,  setCredId]  = useState("");
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!credId.trim()) return;
    setLoading(true);
    setResult(null);
    const found = await verifyCredentialById(credId);
    setResult(found || "not_found");
    setLoading(false);
  };

  const statusDetails = {
    Verified: {
      icon: "✅", bg: "#F0FDF4", border: "#BBF7D0",
      titleColor: "#16A34A", title: "Credential Verified",
      desc: "This credential has been officially verified by the institution.",
    },
    Pending: {
      icon: "⏳", bg: "#FFFBEB", border: "#FDE68A",
      titleColor: "#D97706", title: "Verification Pending",
      desc: "This credential is currently under review by the admin team.",
    },
    Rejected: {
      icon: "❌", bg: "#FEF2F2", border: "#FECACA",
      titleColor: "#DC2626", title: "Credential Rejected",
      desc: "This credential could not be verified by the institution.",
    },
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      background: "var(--bg-page)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "60px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 580 }}>

        {/* ── Header ── */}
        <div className="sfv-animate" style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 68, height: 68,
            background: "linear-gradient(135deg,#2563EB,#3B82F6)",
            borderRadius: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, margin: "0 auto 20px",
            boxShadow: "0 8px 24px rgba(37,99,235,0.25)",
          }}>🔍</div>
          <h1 style={{
            color: "#0F172A", fontSize: 30, fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans',sans-serif", margin: 0,
          }}>
            Verify a Credential
          </h1>
          <p style={{ color: "#64748B", marginTop: 10, fontSize: 15, lineHeight: 1.6 }}>
            Enter a Credential ID to instantly check its authenticity and current verification status.
          </p>
        </div>

        {/* ── Search Card ── */}
        <div className="sfv-card sfv-animate-1" style={{
          padding: 32,
          boxShadow: "var(--shadow-lg)",
        }}>
          {/* Blue top accent */}
          <div style={{
            height: 4, background: "linear-gradient(90deg,#2563EB,#3B82F6,#0EA5E9)",
            borderRadius: "12px 12px 0 0",
            margin: "-32px -32px 28px",
          }} />

          <label className="sfv-label">Credential ID</label>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <input
              style={{
                flex: 1,
                background: "#F8FAFF",
                border: "1.5px solid #DBEAFE",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                color: "#0F172A",
                fontSize: 15,
                outline: "none",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              placeholder="e.g. CRED-001"
              value={credId}
              onChange={e => setCredId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleVerify()}
              onFocus={e => { e.target.style.borderColor = "#2563EB"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.10)"; }}
              onBlur={e => { e.target.style.borderColor = "#DBEAFE"; e.target.style.boxShadow = "none"; }}
            />
            <button
              onClick={handleVerify}
              disabled={loading || !credId.trim()}
              className="sfv-btn"
              style={{ padding: "12px 24px", whiteSpace: "nowrap" }}>
              {loading ? "Checking…" : "Verify →"}
            </button>
          </div>

          {/* Sample IDs */}
          <div style={{
            background: "#F8FAFF", border: "1px solid #DBEAFE",
            borderRadius: 8, padding: "12px 16px",
          }}>
            <div style={{ color: "#2563EB", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 8 }}>
              SAMPLE CREDENTIAL IDs
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["CRED-001", "CRED-002", "CRED-003", "CRED-004"].map(id => (
                <button key={id}
                  onClick={() => setCredId(id)}
                  style={{
                    background: "#fff", border: "1px solid #DBEAFE",
                    color: "#2563EB", padding: "4px 12px",
                    borderRadius: 20, fontSize: 12,
                    fontFamily: "'DM Mono',monospace", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EFF6FF"; e.currentTarget.style.borderColor = "#2563EB"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#DBEAFE"; }}>
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Result: Found ── */}
        {result && result !== "not_found" && (() => {
          const s = statusDetails[result.status] || statusDetails.Pending;
          return (
            <div className="sfv-card sfv-animate" style={{
              marginTop: 24, overflow: "hidden",
              boxShadow: "var(--shadow-md)",
            }}>
              {/* Status banner */}
              <div style={{
                background: s.bg, borderBottom: `1px solid ${s.border}`,
                padding: "18px 24px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div>
                  <div style={{ color: s.titleColor, fontWeight: 800, fontSize: 16 }}>
                    {s.title}
                  </div>
                  <div style={{ color: "#64748B", fontSize: 13, marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "grid", gap: 0 }}>
                  {[
                    { label: "Credential ID",   val: result.id,           mono: true  },
                    { label: "Certificate",     val: result.certName,     mono: false },
                    { label: "Issued By",       val: result.org,          mono: false },
                    { label: "Faculty Member",  val: result.facultyName,  mono: false },
                    { label: "Issue Date",      val: result.date,         mono: false },
                  ].map((row, i) => (
                    <div key={row.label} style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "12px 0",
                      borderBottom: i < 4 ? "1px solid #F1F5F9" : "none",
                    }}>
                      <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>{row.label}</span>
                      <span style={{
                        color: row.mono ? "#2563EB" : "#0F172A",
                        fontSize: 14, fontWeight: 600,
                        fontFamily: row.mono ? "'DM Mono',monospace" : "inherit",
                      }}>{row.val}</span>
                    </div>
                  ))}
                  {/* Status row */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", paddingTop: 12,
                  }}>
                    <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>Verification Status</span>
                    <StatusBadge status={result.status} />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Result: Not Found ── */}
        {result === "not_found" && (
          <div className="sfv-card sfv-animate" style={{
            marginTop: 24, padding: 36, textAlign: "center",
            border: "1px solid #FECACA",
            boxShadow: "0 4px 20px rgba(220,38,38,0.06)",
          }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🔎</div>
            <div style={{ color: "#DC2626", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
              Credential Not Found
            </div>
            <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7 }}>
              No credential found matching ID{" "}
              <span style={{ color: "#0F172A", fontFamily: "'DM Mono',monospace", fontWeight: 700 }}>
                "{credId}"
              </span>.
              <br />Please double-check the ID and try again.
            </div>
            <button onClick={() => { setCredId(""); setResult(null); }}
              className="sfv-btn-outline"
              style={{ marginTop: 20, padding: "10px 24px" }}>
              Try Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyCredential;
