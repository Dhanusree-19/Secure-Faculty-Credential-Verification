/**
 * Centralised route config.
 * Used as a reference; actual routing lives in App.js.
 */
const routes = [
  { path: "/",        label: "Home",              protected: false },
  { path: "/login",   label: "Login",             protected: false },
  { path: "/verify",  label: "Verify Credential", protected: false },
  { path: "/faculty", label: "Faculty Dashboard", protected: true, role: "faculty" },
  { path: "/admin",   label: "Admin Dashboard",   protected: true, role: "admin"   },
];

export default routes;
