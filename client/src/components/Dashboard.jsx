import React from "react";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div style={{ padding: "30px" }}>
      <h1>Welcome to Dashboard</h1>

      {user && (
        <h2>Mobile Number: {user.mobile}</h2>
      )}
    </div>
  );
};

export default Dashboard;