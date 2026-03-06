/* ─── Dummy Data ─────────────────────────────────────────────────────────── */
export const DUMMY_CREDENTIALS = [
  {
    id: "CRED-001",
    facultyName: "Dr. Anita Sharma",
    certName: "PhD in Computer Science",
    org: "IIT Madras",
    date: "2015-06-15",
    status: "Verified",
    file: "phd_cert.pdf",
  },
  {
    id: "CRED-002",
    facultyName: "Prof. Rajan Mehta",
    certName: "AWS Certified Solutions Architect",
    org: "Amazon Web Services",
    date: "2023-03-22",
    status: "Pending",
    file: "aws_cert.pdf",
  },
  {
    id: "CRED-003",
    facultyName: "Dr. Priya Nair",
    certName: "M.Tech in Data Science",
    org: "NIT Trichy",
    date: "2019-11-10",
    status: "Rejected",
    file: "mtech_cert.pdf",
  },
  {
    id: "CRED-004",
    facultyName: "Mr. Karthik Iyer",
    certName: "Google Cloud Professional",
    org: "Google",
    date: "2024-01-08",
    status: "Pending",
    file: "gcp_cert.pdf",
  },
];

export const DUMMY_USERS = [
  {
    email: "faculty@college.edu",
    password: "faculty123",
    role: "faculty",
    name: "Dr. Anita Sharma",
  },
  {
    email: "admin@college.edu",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
];

/* ─── Mock API Functions ─────────────────────────────────────────────────── */

/** Simulate login – resolves with user or rejects */
export const loginUser = (email, password, role) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = DUMMY_USERS.find(
        (u) => u.email === email && u.password === password && u.role === role
      );
      user ? resolve(user) : reject(new Error("Invalid credentials."));
    }, 700);
  });

/** Fetch all credentials (admin) */
export const getAllCredentials = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve([...DUMMY_CREDENTIALS]), 300)
  );

/** Fetch credentials for one faculty member */
export const getCredentialsByFaculty = (facultyName) =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(DUMMY_CREDENTIALS.filter((c) => c.facultyName === facultyName)),
      300
    )
  );

/** Public lookup by credential ID */
export const verifyCredentialById = (credId) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const found = DUMMY_CREDENTIALS.find(
        (c) => c.id.toLowerCase() === credId.trim().toLowerCase()
      );
      resolve(found || null);
    }, 800)
  );
