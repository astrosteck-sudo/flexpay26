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
      const response = await axios.get(`${API_URL}/api/packages`);

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
        },
      );

      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Payment initialization failed");
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
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Free Fire UID"
        />
      </div>

      <div>
        <label>Select Package</label>

        <select
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
        >
          <option value="">Select Package</option>

          {packages.map((pkg) => (
            <option key={pkg.package_id} value={pkg.package_id}>
              {pkg.diamond_amount} Diamonds - GHS {pkg.price}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Redirecting..." : "Pay With Paystack"}
      </button>
    </div>
  );
}

export default TopUp;

{/* <>
  <div
    className={`package-option-diamonds ${firstDiamondPackage ? "firstDiamondPackage" : ""}`}
    onClick={() => handlefirstDiamondPackage(61, firstDiamondPackage, 1)}
  >
    <img src={diamondsImage} alt="Diamonds" className="diamonds-image" />
    <h2 className="package-option-diamonds-title">583 diamonds</h2>
    <p className="package-option-diamonds-price">₵61.00</p>
  </div>
  <div
    className={`package-option-diamonds ${secondDiamondPackage ? "secondDiamondPackage" : ""}`}
    onClick={() => handlesecondDiamondPackage(120, secondDiamondPackage, 2)}
  >
    <img src={diamondsImage} alt="Diamonds" className="diamonds-image" />
    <h2 className="package-option-diamonds-title">1188 diamonds</h2>
    <p className="package-option-diamonds-price">₵120.00</p>
  </div>
  <div
    className={`package-option-diamonds ${thirdDiamondPackage ? "thirdDiamondPackage" : ""}`}
    onClick={() => handlethirdDiamondPackage(240, thirdDiamondPackage, 3)}
  >
    <img src={diamondsImage} alt="Diamonds" className="diamonds-image" />
    <h2 className="package-option-diamonds-title">2420 diamonds</h2>
    <p className="package-option-diamonds-price">₵240.00</p>
  </div>
  <div
    className={`package-option-diamonds ${fourthDiamondPackage ? "fourthDiamondPackage" : ""}`}
    onClick={() => handlefourthDiamondPackage(590, fourthDiamondPackage, 4)}
  >
    <img src={diamondsImage} alt="Diamonds" className="diamonds-image" />
    <h2 className="package-option-diamonds-title">6160 diamonds</h2>
    <p className="package-option-diamonds-price">₵590.04</p>
  </div>
</>; */}
