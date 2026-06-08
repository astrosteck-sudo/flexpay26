import { SiteFooter } from "../SiteFooter/SiteFooter";
import { LoginHeader } from "./LoginHeader";
import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);

      const response = await api.post("/auth/register", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.status);

      if (response.status === 201) {
        setIsSubmitting(false);
      }
      navigate("/login");
    } catch (err) {
      setError( err.response?.data?.message || err.message || "Something went wrong");
      setIsSubmitting(false);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <>
      <LoginHeader />

      <title>SignUp | FLEXPAY26</title>
      <div className="login-container">
        <h2 className="login-welcome-back">Join The Core</h2>
        <p className="login-sign-in-text">Create an account to buy diamonds</p>

        <div class="shimmer-line"></div>

        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-form-label">Full Name</p>
          <input
            type="text"
            name="username"
            required
            placeholder="warrior@gmail.com"
            className="login-form-input"
            value={formData.username}
            onChange={handleChange}
          />

          <p className="login-form-label">Email Address</p>
          <input
            type="email"
            name="email"
            required
            placeholder="***********"
            className="login-form-input"
            value={formData.email}
            onChange={handleChange}
          />

          <p className="login-form-label">Phone Number</p>
          <input
            type="number"
            name="phoneNumber"
            required
            placeholder="***********"
            className="login-form-input"
            value={formData.phoneNumber}
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

          <button className={`login-submit-button`}>
            {isSubmitting ? "Registering" : "Register"}
          </button>
          <p className="signUp-error-message">{error}</p>
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
