import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getAllCredentials } from "../services/api";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [creds,   setCreds]   = useState([]);
  const [filter,  setFilter]  = useState("All");
  const [loading, setLoading] = useState(true);
  const [flash,   setFlash]   = useState(null); // { id, action }

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/login"); return; }
    getAllCredentials().then(data => { setCreds(data); setLoading(false); });
  }, [user, navigate]);

  const updateStatus = (id, status) => {
    setCreds(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setFlash({ id, status });
    setTimeout(() => setFlash(null), 2000);
  };

  const filtered = filter === "All" ? creds : creds.filter(c => c.status === filter);

  const stats = [
    { label: "Total",    val: creds.length,                                     color: "sfv-stat-blue",   textColor: "#2563EB", key: "All"      },
    { label: "Verified", val: creds.filter(c => c.status === "Verified").length, color: "sfv-stat-green",  textColor: "#16A34A", key: "Verified" },
    { label: "Pending",  val: creds.filter(c => c.status === "Pending").length,  color: "sfv-stat-yellow", textColor: "#D97706", key: "Pending"  },
    { label: "Rejected", val: creds.filter(c => c.status === "Rejected").length, color: "sfv-stat-red",    textColor: "#DC2626", key: "Rejected" },
  ];

  if (!user) return null;

  return (
    <div className="sfv-page">
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* ── Page Header ── */}
        <div className="sfv-animate" style={{
          background: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
          borderRadius: 16, padding: "28px 32px",
          marginBottom: 32, position: "relative", overflow: "hidden",
        }}>
          <div className="sfv-dot-bg" style={{ opacity: 0.4 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>
              Admin Control Panel
            </div>
            <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", margin: 0 }}>
              Credential Management
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 6, fontSize: 14 }}>
              Review, verify, or reject submitted faculty credentials
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="row g-3 mb-4">
          {stats.map(s => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className={`sfv-stat-card ${s.color}`} onClick={() => setFilter(s.key)}>
                <div style={{ color: s.textColor, fontSize: 28, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {s.val}
                </div>
                <div style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>{s.label}</div>
                {filter === s.key && (
                  <div style={{
                    position: "absolute", bottom: 10, right: 12,
                    color: s.textColor, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                  }}>ACTIVE ●</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter & Table ── */}
        <div className="sfv-card sfv-animate-1" style={{ overflow: "hidden" }}>

          {/* Table header */}
          <div style={{
            padding: "18px 24px", borderBottom: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <h2 style={{ color: "#0F172A", fontSize: 17, fontWeight: 800, margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Submitted Credentials
              </h2>
              <p style={{ color: "#94A3B8", fontSize: 13, margin: "3px 0 0" }}>
                {filtered.length} record{filtered.length !== 1 ? "s" : ""}
                {filter !== "All" ? ` · filtered by "${filter}"` : ""}
              </p>
            </div>
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All", "Pending", "Verified", "Rejected"].map(f => (
                <button key={f}
                  className={`sfv-tab ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Flash message */}
          {flash && (
            <div className={`sfv-alert-${flash.status === "Verified" ? "success" : "error"}`}
              style={{ margin: "12px 24px", borderRadius: 8 }}>
              {flash.status === "Verified"
                ? `✓ Credential ${flash.id} has been verified.`
                : `✕ Credential ${flash.id} has been rejected.`}
            </div>
          )}

          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: "#94A3B8" }}>Loading credentials…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 60, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
              <div style={{ color: "#475569", fontWeight: 600 }}>No credentials for this filter</div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="sfv-table">
                <thead>
                  <tr>
                    {["Cred. ID", "Faculty Name", "Certificate", "Organization", "Date", "Status", "Actions"].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} style={{ background: i % 2 !== 0 ? "#F8FAFF" : "#fff" }}>
                      <td>
                        <span style={{ color: "#2563EB", fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600 }}>
                          {c.id}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{c.facultyName}</td>
                      <td style={{ color: "#334155", maxWidth: 180 }}>{c.certName}</td>
                      <td style={{ color: "#64748B", fontSize: 13 }}>{c.org}</td>
                      <td style={{ color: "#64748B", fontSize: 13 }}>{c.date}</td>
                      <td><StatusBadge status={c.status} /></td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          {c.status !== "Verified" && (
                            <button
                              onClick={() => updateStatus(c.id, "Verified")}
                              style={{
                                background: "#F0FDF4", border: "1px solid #BBF7D0",
                                color: "#16A34A", padding: "5px 14px",
                                borderRadius: 6, fontSize: 12, fontWeight: 700,
                                cursor: "pointer", transition: "all 0.15s",
                                fontFamily: "inherit",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#DCFCE7"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "#F0FDF4"; }}>
                              ✓ Verify
                            </button>
                          )}
                          {c.status !== "Rejected" && (
                            <button
                              onClick={() => updateStatus(c.id, "Rejected")}
                              style={{
                                background: "#FEF2F2", border: "1px solid #FECACA",
                                color: "#DC2626", padding: "5px 14px",
                                borderRadius: 6, fontSize: 12, fontWeight: 700,
                                cursor: "pointer", transition: "all 0.15s",
                                fontFamily: "inherit",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#FEE2E2"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "#FEF2F2"; }}>
                              ✕ Reject
                            </button>
                          )}
                          {c.status === "Verified" && (
                            <span style={{ color: "#94A3B8", fontSize: 12, padding: "5px 0" }}>No actions</span>
                          )}
                        </div>
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
