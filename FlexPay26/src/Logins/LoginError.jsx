// src/pages/LoginError.jsx
import { useLocation, Link } from "react-router-dom";

export function LoginError() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const provider = params.get("error") || "login";

  return (
    <div style={{
      backgroundColor: "#000",   // black background
      color: "#fff",             // white text
      minHeight: "100vh",        // full screen height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#1a1a1a",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(255,255,255,0.2)",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#ff4c4c" }}>⚠️ Login Failed</h1>
        <p>
          {provider === "google" && "Google login was unsuccessful."}
          {provider === "discord" && "Discord login was unsuccessful."}
          {provider !== "google" && provider !== "discord" && "Login was unsuccessful."}
        </p>
        <p>Please try again or choose another login option.</p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/login" style={{
            padding: "10px 20px",
            backgroundColor: "#4285F4", // Google blue
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none",
            marginRight: "10px"
          }}>
            Retry Google Login
          </Link>
          <Link to="/login" style={{
            padding: "10px 20px",
            backgroundColor: "#5865F2", // Discord purple
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none"
          }}>
            Retry Discord Login
          </Link>
        </div>
      </div>
    </div>
  );
}
