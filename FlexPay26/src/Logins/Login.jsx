import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./Login.css";
import { LoginHeader } from "./LoginHeader";

export function Login() {
  return (
    <>
      <LoginHeader />
      <title>Login | FLEXPAY26</title>

      <div className="login-container">
        <h2 className="login-welcome-back">Welcome Back, Warrior</h2>
        <p className="login-sign-in-text">
          Sign in to access your diamond stash
        </p>

        <div class="shimmer-line"></div>

        <form className="login-form">
          <p className="login-form-label">Email Address</p>
          <input
            type="text"
            required
            placeholder="warrior@gmail.com"
            className="login-form-input"
          />

          <p className="login-form-label">Password</p>
          <input
            required
            placeholder="***********"
            className="login-form-input"
          />

          <button className="login-submit-button">Login</button>
        </form>

        <div className="login-signUp-link">
          <p>
            New Recruit?
            <span className="login-signUp-span">
              <a href="signup" className="login-signUp-a">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
      <SiteFooter></SiteFooter>
    </>
  );
}
