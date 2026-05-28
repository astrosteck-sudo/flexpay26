import "./PageHeader.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function PageHeader() {
  return (
    <>
      <div className="pageheader-container">
        <div className="pageheader-site-name">FLEXPAY26</div>
        <div className="pageheader-links">
          <NavLink className='page-header-link home-link' to='/'>Home</NavLink>
          <NavLink className='page-header-link pricing-link'  to='/'>Pricing</NavLink>
          <NavLink className='page-header-link track-link' to='/'>Track Order</NavLink>
          <NavLink className='page-header-link support-lin' to='/'>Support</NavLink>
        </div>

        <div className="pageheader-logins-buttons">
          <p>LOGIN</p>
        </div>
      </div>
    </>
  );
}
