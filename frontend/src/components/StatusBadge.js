import React from "react";

const StatusBadge = ({ status }) => {
  const classMap = {
    Verified: "badge-verified",
    Pending:  "badge-pending",
    Rejected: "badge-rejected",
  };
  const iconMap = {
    Verified: "✓",
    Pending:  "●",
    Rejected: "✕",
  };
  return (
    <span className={`sfv-badge ${classMap[status] || "badge-pending"}`}>
      <span>{iconMap[status] || "●"}</span>
      {status}
    </span>
  );
};

export default StatusBadge;
