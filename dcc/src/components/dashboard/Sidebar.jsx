import React from "react";
import "./dashboard.css";
import logo from "../../assets/logo.png";
import { ImHome } from "react-icons/im";
import { FaBookReader } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { MdLibraryAdd } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { RiContactsFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="brand-container">
        <img className="sidebar-logo" src={logo} alt="brand-logo" />
        <div className="brand-title">
          <h2 className="brand-name">
            {localStorage.getItem("instituteName")}
          </h2>
          <p className="brand-para">Manage your App in easy way...</p>
        </div>
      </div>
      <div className="menu-container">
        <Link
          className={
            location.pathname === "/dashboard/home"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/home"
        >
          {" "}
          <ImHome className="menu-icon" />
          Home
        </Link>
        <Link
          className={
            location.pathname === "/dashboard/batches"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/batches"
        >
          {" "}
          <FaBookReader className="menu-icon" />
          All Batch
        </Link>
        <Link
          className={
            location.pathname === "/dashboard/add-batch"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/add-batch"
        >
          {" "}
          <MdLibraryAdd className="menu-icon" />
          Add Batches
        </Link>
        <Link
          className={
            location.pathname === "/dashboard/students"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/students"
        >
          {" "}
          <PiStudentFill className="menu-icon" />
          All Student
        </Link>
        <Link
          className={
            location.pathname === "/dashboard/add-student"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/add-student"
        >
          {" "}
          <MdGroupAdd className="menu-icon" />
          Add Student
        </Link>
        <Link
          className={
            location.pathname === "/dashboard/collect-fee"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/collect-fee"
        >
          {" "}
          <HiDocumentCurrencyRupee className="menu-icon" />
          Collect Fee
        </Link>
        <Link
          className={
            location.pathname === "/dashboard/payment-history"
              ? "menu-active-link"
              : "menu-link"
          }
          to="/dashboard/payment-history"
        >
          {" "}
          <FaHistory className="menu-icon" />
          Payment History
        </Link>
        <Link className="menu-link" onClick={logoutHandler} to="/logout">
          <IoIosLogOut className="menu-icon" />
          Log out
        </Link>
      </div>
      <div className="contact-us">
        <p>
          <RiContactsFill className="contact-icon" />
          Contact us
        </p>
        <p>
          <BsFillTelephoneOutboundFill className="contact-icon" />
          +91-7398464400
        </p>
      </div>
    </>
  );
};

export default Sidebar;
