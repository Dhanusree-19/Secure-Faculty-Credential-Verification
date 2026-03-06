import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getAllCredentials } from "../services/api";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [creds,   setCreds]   = useState([]);
  const [filter,  setFilter]  = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/login"); return; }
    getAllCredentials().then((data) => { setCreds(data); setLoading(false); });
  }, [user, navigate]);

  const updateStatus = (id, status) =>
    setCreds((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));

  const filtered = filter === "All" ? creds : creds.filter((c) => c.status === filter);

  const stats = [
    { label:"Total",    val:creds.length,                                      color:"#3b82f6" },
    { label:"Verified", val:creds.filter((c)=>c.status==="Verified").length,  color:"#10b981" },
    { label:"Pending",  val:creds.filter((c)=>c.status==="Pending").length,   color:"#f59e0b" },
    { label:"Rejected", val:creds.filter((c)=>c.status==="Rejected").length,  color:"#ef4444" },
  ];

  if (!user) return null;

  return (
    <div className="sfv-page">
      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <div style={{ color:"#f59e0b", fontSize:13, fontWeight:700, letterSpacing:"0.1em", marginBottom:6, textTransform:"uppercase" }}>
            Admin Control Panel
          </div>
          <h1 style={{ color:"#f1f5f9", fontSize:30, fontWeight:800, fontFamily:"'Sora',sans-serif", margin:0 }}>
            Credential Management
          </h1>
          <p style={{ color:"#64748b", marginTop:6 }}>Review, verify, or reject submitted faculty credentials.</p>
        </div>

        {/* Stats – click to filter */}
        <div className="row g-3 mb-4">
          {stats.map((s) => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className="sfv-card" style={{ padding:"18px 20px", cursor:"pointer", borderTop:`3px solid ${s.color}` }}
                onClick={() => setFilter(s.label === "Total" ? "All" : s.label)}>
                <div style={{ color:s.color, fontSize:26, fontWeight:800, fontFamily:"'Sora',sans-serif" }}>{s.val}</div>
                <div style={{ color:"#64748b", fontSize:13, marginTop:3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="d-flex gap-2 mb-3 flex-wrap">
          {["All","Pending","Verified","Rejected"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter===f ? "rgba(59,130,246,0.15)" : "transparent",
              border:     filter===f ? "1px solid rgba(59,130,246,0.4)" : "1px solid #334155",
              color:      filter===f ? "#60a5fa" : "#64748b",
              padding:"7px 18px", borderRadius:7, cursor:"pointer", fontSize:13, fontWeight:600,
            }}>{f}</button>
          ))}
        </div>

        {/* Table */}
        <div className="sfv-card" style={{ overflow:"hidden" }}>
          {loading ? (
            <div style={{ padding:40, textAlign:"center", color:"#475569" }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding:40, textAlign:"center", color:"#475569" }}>No credentials for this filter.</div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table className="sfv-table">
                <thead>
                  <tr>
                    {["ID","Faculty Name","Certificate","Organization","Date","Status","Actions"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} style={{ background: i%2 !== 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                      <td style={{ color:"#60a5fa", fontFamily:"'DM Mono',monospace", fontSize:12 }}>{c.id}</td>
                      <td style={{ color:"#e2e8f0", fontWeight:600 }}>{c.facultyName}</td>
                      <td style={{ color:"#cbd5e1" }}>{c.certName}</td>
                      <td style={{ color:"#94a3b8", fontSize:13 }}>{c.org}</td>
                      <td style={{ color:"#94a3b8", fontSize:13 }}>{c.date}</td>
                      <td><StatusBadge status={c.status} /></td>
                      <td>
                        {c.status !== "Verified" && (
                          <button onClick={() => updateStatus(c.id,"Verified")} style={{
                            background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.3)",
                            color:"#34d399", padding:"5px 14px", borderRadius:6,
                            fontSize:12, fontWeight:700, cursor:"pointer", marginRight:6,
                          }}>✓ Verify</button>
                        )}
                        {c.status !== "Rejected" && (
                          <button onClick={() => updateStatus(c.id,"Rejected")} style={{
                            background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
                            color:"#f87171", padding:"5px 14px", borderRadius:6,
                            fontSize:12, fontWeight:700, cursor:"pointer",
                          }}>✗ Reject</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
