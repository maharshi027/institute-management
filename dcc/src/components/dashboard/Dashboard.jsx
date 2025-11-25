import React from "react";
import "./dashboard.css";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.clear()
    navigate('/login')
  }
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
                <h2 className="profile-name">{localStorage.getItem('instituteName')}</h2>
                <button className="logout-btn" onClick={logoutHandler}>Logout</button>
            </div>
          </div>
          <div className="outlet">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
