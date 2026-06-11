import { useState, useEffect } from "react";
import axios from "axios";

function TopUp() {
  const [playerId, setPlayerId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/packages`
      );

      setPackages(response.data.packages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      if (!playerId || !packageId) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/payment/initialize`,
        {
          player_id: playerId,
          package_id: packageId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href =
        response.data.authorization_url;

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Payment initialization failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="topup-container">

      <h2>Free Fire Diamond Top Up</h2>

      <div>
        <label>Player ID</label>

        <input
          type="text"
          value={playerId}
          onChange={(e) =>
            setPlayerId(e.target.value)
          }
          placeholder="Enter Free Fire UID"
        />
      </div>

      <div>
        <label>Select Package</label>

        <select
          value={packageId}
          onChange={(e) =>
            setPackageId(e.target.value)
          }
        >
          <option value="">
            Select Package
          </option>

          {packages.map((pkg) => (
            <option
              key={pkg.package_id}
              value={pkg.package_id}
            >
              {pkg.diamond_amount} Diamonds
              - GHS {pkg.price}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
      >
        {loading
          ? "Redirecting..."
          : "Pay With Paystack"}
      </button>

    </div>
  );
}

export default TopUp;