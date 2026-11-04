import {
  FaExpandAlt,
  FaChartBar,
  FaShieldAlt,
  FaSimCard,
  FaGift,
  FaSearch,
} from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { PiChartDonutBold } from "react-icons/pi";
import { BsBarChartLineFill } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";

import logo from "../assets/capitec-logo.png";

import { useState } from "react";
import { Link } from "react-router-dom";



const services = [
  { icon: <FaExpandAlt />, label: "Transact" },
  { icon: <BsBarChartLineFill />, label: "Save" },
  { icon: <FaShieldAlt />, label: "Insure" },
  { icon: <PiChartDonutBold />, label: "Credit" },
  { icon: <FaSimCard />, label: "Connect" },
  { icon: <FaGift />, label: "Rewards" },
];


function Header() {
//for my hamburger menu
const [menuOpen, setMenuOpen] = useState(false);  

  return (
    <header>
      {/* PRIMARY NAVIGATION */}
      <nav className="primary-nav">
        <div className="logo">
            <img src={logo} alt="Logo" />
          
        </div>

        <div className="nav-toggle">
          <button className="toggle-btn-personal">Personal</button>
          <button className="toggle-btn-business">Business</button>
        </div>

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Find ways to bank better"
          />
        </div>

        <div className="nav-actions">
          <button className="text-btn"
            onClick={() =>
            window.open("https://direct.capitecbank.co.za/?_gl=1*znl4xf*_gcl_aw*R0NMLjE3OTMwODI2NDkuQ2p3S0NBanc5UHZXQmhBeEVpd0FkZHpZeWRhRVFCOFJEUFZJWkhPOGVBN3VybFAwVG5IS01Ld0N0NUZHTTFJMUVvdlFibkcxUjZ3QW9Sb0NiY3NRQXZEX0J3RQ..*_gcl_au*NDE0NDEwMDAwLjE3OTI0MTY2MDQuLS4tLjE3OTI3MzkzNTMuMTI2Njc5NTgwLjE3OTMxOTM1NDYuMTc5MzIxOTgxNw..*_ga*ODY0ODcwOTQuMTc5MjQxNjU4NA..*_ga_7HVZSB8SBH*czE3OTMyMTkzNTIkbzIyJGcxJHQxNzkzMjE5ODIxJGo0NyRsMCRoMA..", "_blank")}
            >
            <GoShieldLock />
            Sign in
          </button>

          <button className="primary-btn"
            onClick={() =>
            window.open("https://www.capitecbank.co.za/personal/transact/cellphone-app/", "_blank")}
            >
            Get the app
          </button>

          <button className="secondary-btn"
           onClick={() =>
           window.open("https://www.capitecbank.co.za/personal/transact/switch-to-capitec/", "_blank")}
          >
            Switch to Capitec
          </button>

          <HiOutlineMenu className="menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
            />
        </div>
      </nav>

      {menuOpen && (
  <div className="hamburger-menu">
    <Link to="/" onClick={() => setMenuOpen(false)}>
      Check Eligibility
    </Link>

    <Link to="/compare" onClick={() => setMenuOpen(false)}>
      Compare Loan Amounts
    </Link>
  </div>
)}

      {/* SECONDARY NAVIGATION */}
      <nav className="secondary-nav">
        {services.map((item) => (
          <div className="service-card" key={item.label}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </header>
  );
}

export default Header;