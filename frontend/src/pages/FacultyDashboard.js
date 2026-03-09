import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getCredentialsByFaculty } from "../services/api";

const FacultyDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [creds,     setCreds]     = useState([]);
  const [form,      setForm]      = useState({ certName: "", org: "", date: "", file: null });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("upload");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    getCredentialsByFaculty(user.name).then(data => {
      setCreds(data);
      setLoading(false);
    });
  }, [user, navigate]);

  const handleSubmit = () => {
    if (!form.certName || !form.org || !form.date) return;
    const newCred = {
      id: `CRED-00${creds.length + 5}`,
      facultyName: user.name,
      certName: form.certName,
      org: form.org,
      date: form.date,
      status: "Pending",
      file: form.file ? form.file.name : "document.pdf",
    };
    setCreds(prev => [...prev, newCred]);
    setForm({ certName: "", org: "", date: "", file: null });
    setSubmitted(true);
    setActiveTab("credentials");
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (!user) return null;

  const stats = [
    { label: "Total Uploaded",  val: creds.length,                                     color: "sfv-stat-blue",   textColor: "#2563EB" },
    { label: "Verified",        val: creds.filter(c => c.status === "Verified").length, color: "sfv-stat-green",  textColor: "#16A34A" },
    { label: "Pending Review",  val: creds.filter(c => c.status === "Pending").length,  color: "sfv-stat-yellow", textColor: "#D97706" },
    { label: "Rejected",        val: creds.filter(c => c.status === "Rejected").length, color: "sfv-stat-red",    textColor: "#DC2626" },
  ];

  return (
    <div className="sfv-page">
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* ── Page Header ── */}
        <div className="sfv-animate" style={{
          background: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
          borderRadius: 16, padding: "28px 32px",
          marginBottom: 32, position: "relative", overflow: "hidden",
        }}>
          <div className="sfv-dot-bg" style={{ opacity: 0.4 }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>
                Faculty Portal
              </div>
              <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", margin: 0 }}>
                Welcome back, {user.name.split(" ").slice(0,2).join(" ")} 👋
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 6, fontSize: 14, margin: "6px 0 0" }}>
                Manage and track your academic credentials
              </p>
            </div>
            <button onClick={() => setActiveTab("upload")} style={{
              background: "#fff", border: "none",
              color: "#2563EB", padding: "11px 24px",
              borderRadius: 9, fontSize: 14, fontWeight: 800,
              cursor: "pointer", whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}>
              + Upload Credential
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="row g-3 mb-4">
          {stats.map(s => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className={`sfv-stat-card ${s.color}`}>
                <div style={{ color: s.textColor, fontSize: 28, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {s.val}
                </div>
                <div style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[
            { key: "upload",      label: "📤 Upload New" },
            { key: "credentials", label: "📋 My Credentials" },
          ].map(t => (
            <button key={t.key}
              className={`sfv-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Upload Form ── */}
        {activeTab === "upload" && (
          <div className="sfv-card sfv-animate" style={{ padding: 32 }}>
            <div style={{ marginBottom: 24 }}>
              <div className="sfv-section-tag">New Submission</div>
              <h2 style={{
                color: "#0F172A", fontSize: 20, fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans',sans-serif", marginTop: 8,
              }}>Upload Credential</h2>
              <p style={{ color: "#64748B", fontSize: 14, marginTop: 4 }}>
                Fill in the details below and attach the supporting document.
              </p>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="sfv-label">Certificate / Degree Name</label>
                <input className="sfv-input"
                  placeholder="e.g. PhD in Computer Science"
                  value={form.certName}
                  onChange={e => setForm({ ...form, certName: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="sfv-label">Issuing Organization</label>
                <input className="sfv-input"
                  placeholder="e.g. IIT Madras"
                  value={form.org}
                  onChange={e => setForm({ ...form, org: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="sfv-label">Issue Date</label>
                <input className="sfv-input" type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="sfv-label">Upload Document (PDF / Image)</label>
                <input className="sfv-input" type="file" accept=".pdf,.jpg,.png"
                  style={{ padding: "8px 14px" }}
                  onChange={e => setForm({ ...form, file: e.target.files[0] })} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={handleSubmit} className="sfv-btn" style={{ padding: "12px 32px" }}>
                Submit for Verification
              </button>
              <button onClick={() => setForm({ certName:"", org:"", date:"", file:null })}
                className="sfv-btn-ghost">
                Clear Form
              </button>
            </div>
          </div>
        )}

        {/* ── Credentials Table ── */}
        {activeTab === "credentials" && (
          <div className="sfv-card sfv-animate" style={{ overflow: "hidden" }}>
            <div style={{
              padding: "20px 28px", borderBottom: "1px solid #E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <h2 style={{ color: "#0F172A", fontSize: 18, fontWeight: 800, margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  My Credentials
                </h2>
                <p style={{ color: "#64748B", fontSize: 13, margin: "4px 0 0" }}>
                  {creds.length} credential{creds.length !== 1 ? "s" : ""} submitted
                </p>
              </div>
              {submitted && (
                <div className="sfv-alert-success" style={{ padding: "8px 16px" }}>
                  ✓ New credential submitted for review!
                </div>
              )}
            </div>

            {loading ? (
              <div style={{ padding: 48, textAlign: "center" }}>
                <div style={{ color: "#94A3B8", fontSize: 14 }}>Loading your credentials…</div>
              </div>
            ) : creds.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
                <div style={{ color: "#475569", fontWeight: 600, marginBottom: 8 }}>No credentials yet</div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginBottom: 20 }}>
                  Upload your first credential to get started
                </div>
                <button onClick={() => setActiveTab("upload")} className="sfv-btn" style={{ padding: "10px 24px" }}>
                  Upload Credential
                </button>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="sfv-table">
                  <thead>
                    <tr>
                      {["Credential ID", "Certificate Name", "Organization", "Issue Date", "Status"].map(h => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {creds.map((c, i) => (
                      <tr key={c.id} style={{ background: i % 2 !== 0 ? "#F8FAFF" : "#fff" }}>
                        <td>
                          <span style={{ color: "#2563EB", fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 600 }}>
                            {c.id}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{c.certName}</td>
                        <td style={{ color: "#64748B" }}>{c.org}</td>
                        <td style={{ color: "#64748B", fontSize: 13 }}>{c.date}</td>
                        <td><StatusBadge status={c.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default FacultyDashboard;
