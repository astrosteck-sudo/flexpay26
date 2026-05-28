import "./PageHeader.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import hamburgerButton from "../assets/icons/hamburger-button-4.png";
import { useState } from "react";

export function PageHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function handleMobileNavOpen() {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    } else {
      setIsMobileNavOpen(true);
    }
  }
  return (
    <>
      <div className="pageheader-container">
        <div className="pageheader-site-name">FLEXPAY26</div>
        <div className="pageheader-links">
          <NavLink className="page-header-link home-link" to="/">
            Home
          </NavLink>
          <NavLink className="page-header-link pricing-link" to="/hh">
            Pricing
          </NavLink>
          <NavLink className="page-header-link track-link" to="/hhjj">
            Track Order
          </NavLink>
          <NavLink className="page-header-link support-lin" to="/hhh">
            Support
          </NavLink>
        </div>

        <div className="pageheader-logins-buttons">
          <p>LOGIN</p>
        </div>

        <img
          src={hamburgerButton}
          alt=""
          className="page-header-hambuger-button"
          onClick={handleMobileNavOpen}
        />
      </div>

      <div className={`mobile-pageheader-links ${isMobileNavOpen? 'open' :'close'}`}>
        <NavLink className="page-header-link home-link" to="/">
          Home
        </NavLink>
        <NavLink className="page-header-link pricing-link" to="/">
          Pricing
        </NavLink>
        <NavLink className="page-header-link track-link" to="/">
          Track Order
        </NavLink>
        <NavLink className="page-header-link support-lin" to="/">
          Support
        </NavLink>

        <div className="mobile-pageheader-logins-buttons">
          <p>LOGIN</p>
        </div>
      </div>
    </>
  );
}
