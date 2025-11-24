import React from "react";
import "./dashboard.css";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-container">
        <div className="nav-container">
          <Sidebar/>
        </div>
        <div className="main-container">
          <div className="top-bar">
            <div className="logo-container"><CgProfile className="profile-logo" /></div>
            <div className="profile-container">
                <h2 className="profile-name">Dinesh Chemistry Classes</h2>
                <button className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
