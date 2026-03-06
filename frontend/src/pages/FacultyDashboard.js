import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getCredentialsByFaculty } from "../services/api";

const FacultyDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [creds,     setCreds]     = useState([]);
  const [form,      setForm]      = useState({ certName:"", org:"", date:"", file:null });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    getCredentialsByFaculty(user.name).then((data) => {
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
    setCreds((prev) => [...prev, newCred]);
    setForm({ certName:"", org:"", date:"", file:null });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!user) return null;

  const stats = [
    { label:"Total Uploaded",  val:creds.length,                                      color:"#3b82f6" },
    { label:"Verified",        val:creds.filter((c) => c.status==="Verified").length,  color:"#10b981" },
    { label:"Pending Review",  val:creds.filter((c) => c.status==="Pending").length,   color:"#f59e0b" },
  ];

  return (
    <div className="sfv-page">
      <div style={{ maxWidth:940, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:36 }}>
          <div style={{ color:"#3b82f6", fontSize:13, fontWeight:700, letterSpacing:"0.1em", marginBottom:6, textTransform:"uppercase" }}>
            Faculty Portal
          </div>
          <h1 style={{ color:"#f1f5f9", fontSize:30, fontWeight:800, fontFamily:"'Sora',sans-serif", margin:0 }}>
            Welcome, {user.name} 👋
          </h1>
          <p style={{ color:"#64748b", marginTop:6 }}>Manage and track your uploaded credentials below.</p>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          {stats.map((s) => (
            <div className="col-md-4" key={s.label}>
              <div className="sfv-card" style={{ padding:"20px 24px" }}>
                <div style={{ color:s.color, fontSize:28, fontWeight:800, fontFamily:"'Sora',sans-serif" }}>{s.val}</div>
                <div style={{ color:"#64748b", fontSize:13, marginTop:4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload form */}
        <div className="sfv-card mb-4" style={{ padding:32 }}>
          <h2 style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:24, fontFamily:"'Sora',sans-serif" }}>
            📤 Upload New Credential
          </h2>

          {submitted && (
            <div className="sfv-alert-success mb-3">
              ✓ Credential submitted! Status: Pending review.
            </div>
          )}

          <div className="row g-3">
            <div className="col-md-6">
              <label className="sfv-label">Certificate Name</label>
              <input className="sfv-input" placeholder="e.g. PhD in Computer Science"
                value={form.certName} onChange={(e) => setForm({ ...form, certName:e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="sfv-label">Issuing Organization</label>
              <input className="sfv-input" placeholder="e.g. IIT Madras"
                value={form.org} onChange={(e) => setForm({ ...form, org:e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="sfv-label">Issue Date</label>
              <input className="sfv-input" type="date"
                value={form.date} onChange={(e) => setForm({ ...form, date:e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="sfv-label">Upload Document</label>
              <input className="sfv-input" type="file" accept=".pdf,.jpg,.png"
                style={{ padding:"8px 14px" }}
                onChange={(e) => setForm({ ...form, file:e.target.files[0] })} />
            </div>
          </div>

          <button onClick={handleSubmit} className="btn mt-4" style={{
            background:"linear-gradient(135deg,#3b82f6,#2563eb)", border:"none",
            color:"#fff", padding:"12px 32px", borderRadius:9, fontSize:14,
            fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(59,130,246,0.35)",
          }}>
            Submit Credential
          </button>
        </div>

        {/* Table */}
        <div className="sfv-card" style={{ overflow:"hidden" }}>
          <div style={{ padding:"20px 28px", borderBottom:"1px solid #334155" }}>
            <h2 style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, margin:0, fontFamily:"'Sora',sans-serif" }}>
              My Credentials
            </h2>
          </div>

          {loading ? (
            <div style={{ padding:40, textAlign:"center", color:"#475569" }}>Loading…</div>
          ) : creds.length === 0 ? (
            <div style={{ padding:40, textAlign:"center", color:"#475569" }}>No credentials uploaded yet.</div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table className="sfv-table">
                <thead>
                  <tr>
                    {["Credential ID","Certificate Name","Organization","Issue Date","Status"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {creds.map((c, i) => (
                    <tr key={c.id} style={{ background: i%2 !== 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                      <td style={{ color:"#60a5fa", fontFamily:"'DM Mono',monospace", fontSize:13 }}>{c.id}</td>
                      <td style={{ color:"#e2e8f0" }}>{c.certName}</td>
                      <td style={{ color:"#94a3b8" }}>{c.org}</td>
                      <td style={{ color:"#94a3b8", fontSize:13 }}>{c.date}</td>
                      <td><StatusBadge status={c.status} /></td>
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

export default FacultyDashboard;
