import "./HomePage.css";

export function HomePage() {
  return (
    <>
      <div className="main-body-homepage">
        <p className="main-body-homepage-top-up-text">Top Up Free Fire <span className="diamonds-instantely-span">Diamonds Instantly</span></p>

        <p className="main-body-homepage-description-text">
          Dominate the battlefield with lightning-fast delivery, 100% secure
          payments, and around-the-clock support. Aggressively professional
          gaming currency.{" "}
        </p>

        <div className="main-body-homepage-buttons">
          <button className="main-body-homepage-button-buy-diamonds">Buy Diamonds</button>
          <button className="main-body-homepage-button-view-packages">View Packages</button>
        </div>
      </div>
    </>
  );
}
