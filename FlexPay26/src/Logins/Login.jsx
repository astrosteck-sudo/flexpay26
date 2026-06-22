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
              <a href="https://flexpay26.onrender.com/api/auth/google" className="login-external-google-button">
                <svg
                  xmlns="http://w3.org"
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  className="login-google-svg"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>

                <p>Google</p>
              </a>
              <a href="https://flexpay26.onrender.com/api/auth/discord" className="login-external-discord-button">
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
