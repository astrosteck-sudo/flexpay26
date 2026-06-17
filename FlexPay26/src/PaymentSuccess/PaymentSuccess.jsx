import "./PaymentSuccess.css";
import { useEffect, useState } from "react";
//import axios from "axios";
import { useSearchParams } from "react-router-dom";
import api from "../axios";
import { LoginHeader } from "../Logins/LoginHeader";
import { SiteFooter } from "../SiteFooter/SiteFooter";

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  //const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/reference/${reference}`);

      setOrder(res.data.order);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Verifying payment...</h2>;
  }

  if (!order) {
    return <h2>Order not found frontend</h2>;
  }

  return (
    <>
      <title>Mission Accomplished | FlexPay26</title>
      <LoginHeader />

      <div className="payment-success-page-main-container">
        <div className="payment-success-page-main-title">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="payment-success-page-svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="#1a1a1a"
              stroke="#cc5500"
              stroke-width="2.5"
            />

            <polyline
              points="7 12 10.5 15.5 17 8.5"
              fill="none"
              stroke="#cc5500"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h2 className="payment-success-page-title">MISSION ACCOMPLISHED</h2>

          <p className="payment-success-page-description">
            <p>Your diamonds have been beamed to your account.</p>
            <p>Prepare for battle, Warrior!</p>
          </p>
        </div>

        <div className="payment-success-page-transaction-summary-container">
          <div className="payment-success-page-transaction-summary-header">
            <p>Transaction Status</p>
            <p
              className={`payment-success-page-transaction-status ${order?.status === "paid" ? "success" : "failed"}`}
            >
              {order?.status === "paid" ? "SUCCESSFUL" : "FAILED"}
            </p>
          </div>

          <div className="payment-success-page-transaction-summary-details-container">
            <div>
              <h2>Order ID</h2>
              <p>#DC-8829{order?.order_id}</p>
            </div>

            <div>
              <h2>Amount Paid</h2>
              <p
                style={{ color: "rgb(255 107 0 / var(--tw-text-opacity, 1))" }}
              >
                ${order?.amount_paid}
              </p>
            </div>
          </div>

          <div className="payment-success-page-transaction-summary-details-container">
            <div>
              <h2>Diamonds Credited</h2>
              <p>{order?.diamond_amount} Diamonds</p>
            </div>

            <div>
              <h2>Player ID</h2>
              <p>{order?.player_id}</p>
            </div>
          </div>

          <div className="payment-success-page-buttons">
            <div>
              <a href="/userdashboard">BACK TO DASHBOARD</a>
            </div>
            <div>
              <a href="/">HOME</a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
