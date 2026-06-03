import "./HomePage.css";
import diamondsImage from "../assets/icons/diamonds.png";

export function HomePage() {
  return (
    <>
      <div className="main-body-homepage">
        <p className="main-body-homepage-top-up-text">
          Top Up Free Fire{" "}
          <span className="diamonds-instantely-span">Diamonds Instantly</span>
        </p>

        <p className="main-body-homepage-description-text">
          Dominate the battlefield with lightning-fast delivery, 100% secure
          payments, and around-the-clock support. Aggressively professional
          gaming currency.{" "}
        </p>

        <div className="main-body-homepage-buttons">
          <button className="main-body-homepage-button-buy-diamonds">
            Buy Diamonds
          </button>
          <button className="main-body-homepage-button-view-packages">
            View Packages
          </button>
        </div>
      </div>

      <div className="main-body-user-orders-container">
        <div className="player-id-container-and-select-package-container">
          <div className="player-id-container">
            <div className="game-profile-icon-and-enter-player-id-text">
              <div className="game-profile-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 
             7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 
             1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
                  />
                </svg>{" "}
              </div>
              <h2 className="game-profile-enter-player-id-text">
                1. ENTER PLAYER ID
              </h2>
            </div>
            <input
              type="text"
              placeholder="Enter Player ID"
              className="player-input"
            />
          </div>
          <div className="select-package-container">
            <div className="game-profile-icon-and-select-package">
              <div className="game-profile-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h2 className="game-profile-select-package-text">
                2. SELECT PACKAGE
              </h2>
            </div>

            <div className="package-options-diamonds-container">
              <div className="package-option-diamonds">
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">100 diamonds</h2>
                <p className="package-option-diamonds-price">$1.99</p>
              </div>
              <div className="package-option-diamonds">
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">100 diamonds</h2>
                <p className="package-option-diamonds-price">$1.99</p>
              </div>
              <div className="package-option-diamonds">
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">100 diamonds</h2>
                <p className="package-option-diamonds-price">$1.99</p>
              </div>
              <div className="package-option-diamonds">
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">100 diamonds</h2>
                <p className="package-option-diamonds-price">$1.99</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary-container">
          <h2 className="order-summary-title">ORDER SUMMARY</h2>
          <div className="order-summary-items-and-values">
            <p className="order-summary-item">Player ID</p>{" "}
            <p className="order-summary-value">123456789</p>
          </div>
          <div className="order-summary-items-and-values">
            <p className="order-summary-item">Package</p>{" "}
            <p className="order-summary-value">100 Diamonds</p>
          </div>
          <div className="order-summary-items-and-values last">
            <p className="order-summary-item">Price</p>{" "}
            <p className="order-summary-value">$1.99</p>
          </div>
          <div className="order-summary-items-and-values-total-container">
            <h2 className="order-summary-total-text">TOTAL</h2>
            <p className="order-summary-value-grand-total">$1.99</p>
          </div>
          <div className="order-summary-phone-number-container">
            <h2 className="order-summary-item">Phone Number</h2>
            <input
              type="number"
              placeholder="Enter Phone Number"
              className="player-input user-phone-number-input"
            />
            <button className="order-summary-confirm-button">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
