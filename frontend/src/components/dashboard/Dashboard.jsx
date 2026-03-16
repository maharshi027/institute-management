import React, { useState } from "react";
import "./dashboard.css";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-main-container">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div className="dashboard-container">
        <div className={`nav-container ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="main-container">
          <div className="top-bar">
            <div className="hamburger-menu" onClick={toggleSidebar}>
              <GiHamburgerMenu size={30} />
            </div>
            <div className="top-bar-right">
              <div className="logo-container">
                <CgProfile className="profile-logo" />
              </div>
            <div className="profile-container">
              <h2 className="profile-name">
                {localStorage.getItem("instituteName")}
              </h2>
              <button className="logout-btn" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
          </div>
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
