import { useEffect } from "react";
import api from "../axios";
import { LoginHeader } from "../Logins/LoginHeader";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./ManagerDashboard.css";

export function ManagerDashboard() {
  const getAllUsersOrders = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/orders/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response)
  };

  useEffect(() => {
    getAllUsersOrders()
  }, [])
  return (
    <>
      <LoginHeader />

      <div className="manager-dashboard">
        <div className="manager-dashboard-status-container">
          <div>
            <h2>PROCESSED TODAY</h2>
            <p>1284</p>
          </div>
          <div>
            <h2>PENDING PROCESS</h2>
            <p>2000</p>
          </div>
        </div>

        <div className="manager-dashboard-options-conatainer">
          <p>Pending</p>
          <p>Completed</p>
        </div>

        <div className="manager-dashboard-orders-container">
          <div className="manager-dashboard-order">
            <div className="manager-dashboard-order-details-container">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="manager-dashboard-diamond-svg"
              >
                <polygon points="12 2 22 9 12 22 2 9" />

                <line x1="2" y1="9" x2="22" y2="9" />

                <line x1="2" y1="9" x2="12" y2="2" />

                <line x1="22" y1="9" x2="12" y2="2" />

                <line x1="2" y1="9" x2="12" y2="22" />

                <line x1="22" y1="9" x2="12" y2="22" />

                <line x1="12" y1="2" x2="8" y2="9" />
                <line x1="12" y1="2" x2="16" y2="9" />
              </svg>
              <div className="manager-dashboard-order-details">
                <h2>520 Diamonds</h2>
                <p>
                  <p>
                    <svg
                      xmlns="http://w3.org"
                      viewBox="0 0 100 100"
                      width="100%"
                      height="100%"
                      className="manager-dashboard-order-details-svg"
                    >
                      <g
                        fill="none"
                        stroke="#e2725b"
                        stroke-width="4.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M 32 24 Q 50 18 68 24" />
                        <path d="M 28 32 Q 50 25 72 32" />

                        <path d="M 34 40 Q 50 34 66 40 C 72 45 70 55 62 60" />
                        <path d="M 28 48 Q 50 41 72 48 C 80 56 74 68 64 74" />

                        <path d="M 44 48 C 38 52 40 62 48 64 C 56 66 60 58 54 52" />

                        <path d="M 38 68 C 44 76 56 76 62 68" />
                        <path d="M 44 78 Q 50 82 56 78" />

                        <path d="M 26 40 C 20 52 24 66 36 74" />
                        <path d="M 32 48 C 28 56 32 64 40 68" />
                      </g>
                    </svg>
                    ID: 88291044
                  </p>
                  <p>
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="manager-dashboard-order-details-svg"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 14" />
                    </svg>
                    2 mins ago
                  </p>
                </p>
              </div>
            </div>
            <div className="manager-dashboard-confirm-container">
              <div>
                <h1>AMOUNT</h1>
                <p>$1.99</p>
              </div>

              <button>
                <svg
                  xmlns="http://w3.org"
                  viewBox="0 0 100 100"
                  width="15%"
                  height="100%"
                >
                  <rect width="150" height="100" fill="rgb(255, 102, 0)" />

                  <g
                    fill="none"
                    stroke="#5c1e00"
                    stroke-width="8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="50" cy="50" r="24" />

                    <path d="M 41 50 L 47 56 L 59 42" />
                  </g>
                </svg>
                <p id="manager-dashboard-confirm-button-text">
                  Confirm & Credit
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
