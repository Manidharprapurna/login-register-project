import React from "react";

const AdminDashboard = () => {

  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div style={{ padding: "30px" }}>
      <h1>Welcome to Admin Dashboard</h1>

      {admin && (
        <h2>Admin Mobile: {admin.mobile}</h2>
      )}

    </div>
  );
};

export default AdminDashboard;