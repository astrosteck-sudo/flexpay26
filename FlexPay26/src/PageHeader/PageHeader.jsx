import "./PageHeader.css";
//import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-scroll";
import { getInitials } from "../utils/initials";

export function PageHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const smoothScroll = (parameter) => {
    if (parameter === "order") {
      document.getElementById("order")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <>
      <div className="pageheader-container">
        <div className="pageheader-site-name">FLEXPAY26</div>
        <div className="pageheader-links">
          <button
            onClick={() => smoothScroll("order")}
            className="page-header-link"
          >
            Pricing
          </button>

          <button
            onClick={() => smoothScroll("support")}
            className="page-header-link"
          >
            Support
          </button>
        </div>

        {token ? (
          ""
        ) : (
          <div className="pageheader-logins-buttons">
            <a href="/login" className="pageheader-logins-link">
              <p>LOGIN</p>
            </a>
          </div>
        )}

        {token && (
          <div className="user-logged-in-pill">
            <a href="/" className="user-logged-in-link">
              <div className="page-header-user-initials">
                {getInitials(user.username)}
              </div>
              <p className="page-header-username">{user.username}</p>
            </a>
          </div>
        )}

        <button
          className={`hamburger ${isMobileNavOpen ? "open" : ""}`}
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`mobile-pageheader-links ${isMobileNavOpen ? "open" : "close"}`}
      >
        <button
          onClick={() => smoothScroll("order")}
          className="page-header-link"
        >
          Pricing
        </button>

        <button
          onClick={() => smoothScroll("support")}
          className="page-header-link"
        >
          Support
        </button>

        {token ? (
          ""
        ) : (
          <div className="mobile-pageheader-logins-buttons">
            <a href="/login" className="pageheader-logins-link">
              <p>LOGIN</p>
            </a>
          </div>
        )}

        {token && (
          <div className="mobile-user-logged-in-pill">
            <a href="/" className="user-logged-in-link">
              <div className="page-header-user-initials">
                {getInitials(user.username)}
              </div>
              <p className="page-header-username">{user.username}</p>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
