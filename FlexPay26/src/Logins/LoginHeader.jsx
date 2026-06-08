import "./LoginHeader.css";

export function LoginHeader() {
  return (
    <div className="logins-header">
      <a href="/">
        <svg
          className="right-arrow-svg"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="11 6 5 12 11 18" />
        </svg>
      </a>

      <div className="pageheader-site-name">FLEXPAY26</div>
    </div>
  );
}
