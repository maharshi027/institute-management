import React from 'react'
import "./dashboard.css";
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
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

const Sidebar = () => {
  return (
    <>
      <div className="brand-container">
        <img className='sidebar-logo' src={logo} alt="brand-logo" />
        <div className='brand-title'>
          <h2 className='brand-name'>Dinesh Chemistry Classes</h2>
          <p className='brand-para'>Manage your App in easy way...</p>
        </div>
      </div>
      <div className="menu-container">
        <Link className="menu-link" > <ImHome className='menu-icon'/>Home</Link>
        <Link className="menu-link" > <FaBookReader className='menu-icon'/>All Batch</Link>
        <Link className="menu-link" > <MdLibraryAdd className='menu-icon'/>Add Batches</Link>
        <Link className="menu-link" > <PiStudentFill className='menu-icon'/>All Student</Link>
        <Link className="menu-link" > <MdGroupAdd className='menu-icon'/>Add Student</Link>
        <Link className="menu-link" > <HiDocumentCurrencyRupee className='menu-icon'/>Collect Fee</Link>
        <Link className="menu-link" > <FaHistory className='menu-icon'/>Payment History</Link>
        <Link className="menu-link" to='/logout'> <IoIosLogOut className='menu-icon'/>Log out</Link>
      </div>
      <div className='contact-us'>
        <p><RiContactsFill className='contact-icon'/>Contact us</p>
        <p><BsFillTelephoneOutboundFill className='contact-icon'/>+91-7398464400</p>
      </div>
    </>
  )
}

export default Sidebar
