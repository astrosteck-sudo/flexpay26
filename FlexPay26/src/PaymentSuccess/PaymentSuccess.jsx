import "./PaymentSuccess.css";
import { useEffect, useState } from "react";
//import axios from "axios";
import { useSearchParams } from "react-router-dom";
import api from "../axios";

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
    return <h2>Order not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payment Successful 🎉</h1>

      <div className="payment-div">
        <p>
          <strong>Player ID:</strong> {order.player_id}
        </p>

        <p>
          <strong>Diamonds:</strong> {order.diamond_amount}
        </p>

        <p>
          <strong>Amount Paid:</strong> GHS {order.amount_paid}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>

      <p>Your diamonds will be delivered shortly.</p>
    </div>
  );
}
