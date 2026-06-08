import { SiteFooter } from "../SiteFooter/SiteFooter";
import { LoginHeader } from "./LoginHeader";
import "./SignUp.css";

export function SignUp() {
  return (
    <>
      <LoginHeader />

      <title>SignUp | FLEXPAY26</title>
      <div className="login-container">
        <h2 className="login-welcome-back">Join The Core</h2>
        <p className="login-sign-in-text">Create an account to buy diamonds</p>

        <div class="shimmer-line"></div>

        <form className="login-form">
          <p className="login-form-label">Full Name</p>
          <input
            type="text"
            required
            placeholder="warrior@gmail.com"
            className="login-form-input"
          />

          <p className="login-form-label">Email Address</p>
          <input
            type="email"
            required
            placeholder="***********"
            className="login-form-input"
          />

          <p className="login-form-label">Phone Number</p>
          <input
            type="number"
            required
            placeholder="***********"
            className="login-form-input"
          />

          <p className="login-form-label">Password</p>
          <input
            type="text"
            required
            placeholder="***********"
            className="login-form-input"
          />

          <button className="login-submit-button">Login</button>
        </form>

        <div className="login-signUp-link">
          <p>
            Already a member?
            <span className="login-signUp-span">
              <a href="login" className="login-signUp-a">
                Login
              </a>
            </span>
          </p>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
