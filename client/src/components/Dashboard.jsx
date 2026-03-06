import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome {user?.mobile}</h3>
    </div>
  );
};

export default Dashboard;