import React, { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { verifyCredentialById } from "../services/api";

const VerifyCredential = () => {
  const [credId,  setCredId]  = useState("");
  const [result,  setResult]  = useState(null);   // null | object | "not_found"
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!credId.trim()) return;
    setLoading(true);
    setResult(null);
    const found = await verifyCredentialById(credId);
    setResult(found || "not_found");
    setLoading(false);
  };

  return (
    <div style={{
      minHeight:"calc(100vh - 64px)", background:"#0f172a",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
      backgroundImage:"radial-gradient(ellipse at 70% 60%,rgba(6,182,212,0.07) 0%,transparent 60%)",
    }}>
      <div style={{ width:"100%", maxWidth:560 }}>

        {/* Title */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
          <h1 style={{ color:"#f1f5f9", fontSize:32, fontWeight:800, fontFamily:"'Sora',sans-serif", margin:0 }}>
            Verify a Credential
          </h1>
          <p style={{ color:"#64748b", marginTop:10, fontSize:15 }}>
            Enter a Credential ID to check its authenticity and current status.
          </p>
        </div>

        {/* Search card */}
        <div className="sfv-card" style={{ padding:36, boxShadow:"0 24px 80px rgba(0,0,0,0.5)" }}>
          <label className="sfv-label">Credential ID</label>
          <input
            style={{
              width:"100%", background:"#0f172a", border:"1px solid #334155",
              borderRadius:9, padding:"13px 16px", color:"#f1f5f9",
              fontSize:15, outline:"none", boxSizing:"border-box",
              fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em", marginBottom:14,
            }}
            placeholder="e.g. CRED-001"
            value={credId}
            onChange={(e) => setCredId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          />

          <button onClick={handleVerify} disabled={loading || !credId.trim()}
            className="btn w-100" style={{
              background: loading || !credId.trim() ? "#334155" : "linear-gradient(135deg,#06b6d4,#0891b2)",
              border:"none", color:"#fff", padding:"13px", borderRadius:9,
              fontSize:15, fontWeight:700, cursor: loading ? "not-allowed" : "pointer",
            }}>
            {loading ? "Checking…" : "Verify Credential"}
          </button>

          <div style={{ marginTop:16, color:"#475569", fontSize:12, textAlign:"center", fontFamily:"'DM Mono',monospace" }}>
            Try: CRED-001 · CRED-002 · CRED-003 · CRED-004
          </div>
        </div>

        {/* Result: found */}
        {result && result !== "not_found" && (
          <div style={{
            marginTop:24, background:"#1e293b",
            border:"1px solid rgba(16,185,129,0.4)",
            borderRadius:16, padding:28, boxShadow:"0 0 40px rgba(16,185,129,0.08)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{
                width:40, height:40, background:"rgba(16,185,129,0.15)", borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
              }}>✅</div>
              <div>
                <div style={{ color:"#34d399", fontWeight:800, fontSize:16 }}>Credential Found</div>
                <div style={{ color:"#64748b", fontSize:13 }}>Here are the details</div>
              </div>
            </div>

            <div style={{ display:"grid", gap:12 }}>
              {[
                { label:"Credential ID", val:result.id },
                { label:"Certificate",   val:result.certName },
                { label:"Issued By",     val:result.org },
                { label:"Faculty",       val:result.facultyName },
                { label:"Issue Date",    val:result.date },
              ].map((row) => (
                <div key={row.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:"#64748b", fontSize:13 }}>{row.label}</span>
                  <span style={{ color:"#e2e8f0", fontSize:14, fontWeight:600 }}>{row.val}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid #334155", paddingTop:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:"#64748b", fontSize:13 }}>Verification Status</span>
                <StatusBadge status={result.status} />
              </div>
            </div>
          </div>
        )}

        {/* Result: not found */}
        {result === "not_found" && (
          <div style={{
            marginTop:24, background:"#1e293b",
            border:"1px solid rgba(239,68,68,0.4)",
            borderRadius:16, padding:28, textAlign:"center",
          }}>
            <div style={{ fontSize:40, marginBottom:12 }}>❌</div>
            <div style={{ color:"#f87171", fontWeight:700, fontSize:16, marginBottom:6 }}>Credential Not Found</div>
            <div style={{ color:"#64748b", fontSize:14 }}>
              No credential matches ID{" "}
              <span style={{ color:"#e2e8f0", fontFamily:"'DM Mono',monospace" }}>{credId}</span>.
              <br />Please check and try again.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCredential;
