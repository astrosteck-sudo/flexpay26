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

          <div className="login-external-login-container">
            <h2>OR CONTINUE WITH</h2>
            <div className="login-external-login-buttons">
              <a
                href="https://flexpay26.onrender.com/api/auth/discord"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36"
                  width="127"
                  height="96"
                  className="login-discord-svg"
                >
                  <path
                    fill="#5865F2"
                    d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5A52.2,52.2,0,0,0,30.2,78.9a75,75,0,0,0,66.8,0,52.2,52.2,0,0,0,2.1,1.65,68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C130,50.22,123.23,27.46,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"
                  />
                </svg>

                <p>Discord</p>
              </a>
            </div>
          </div>
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
      <SiteFooter></SiteFooter>
    </>
  );
}
