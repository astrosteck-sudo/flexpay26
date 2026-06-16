import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./Login.css";
import { LoginHeader } from "./LoginHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios";

export function Login() {
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //setLoading(true);
    setError("");
    setLoggingIn(true);

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      const user = JSON.parse(localStorage.getItem("user"));

      if (user.role === "admin") {
        navigate("/managerDashboard");
      } else {
        navigate("/userdashboard");
      }
      setLoggingIn(false);
    } catch (err) {
      setLoggingIn(false);
      setError(err.response?.data?.message || "Login failed");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      //setLoading(false);
    }
  };
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

        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-form-label">Email Address</p>
          <input
            type="email"
            name="email"
            required
            placeholder="warrior@gmail.com"
            className="login-form-input"
            value={formData.email}
            onChange={handleChange}
          />

          <p className="login-form-label">Password</p>
          <input
            type="text"
            name="password"
            required
            placeholder="***********"
            className="login-form-input"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="login-submit-button">
            {loggingIn ? "Getting you in" : "Login"}
          </button>
          <p className="signUp-error-message">{error}</p>
        </form>

        <div className="login-signUp-link">
          <p>
            New Recruit?
            <span className="login-signUp-span">
              <a href="signup" className="login-signUp-a">
                Sign Up
              </a>
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          window.location.href = "http://localhost:5000/api/auth/discord";
        }}
      >
        Login with Discord
      </button>
      <SiteFooter></SiteFooter>
    </>
  );
}
