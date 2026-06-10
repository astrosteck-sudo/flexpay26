import "./HomePage.css";
import diamondsImage from "../assets/icons/diamonds.png";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { PageHeader } from "../PageHeader/PageHeader";
import { useState } from "react";

export function HomePage() {


  //THIS HANDLES THE SCROLL BEHAVOUR 
  const smoothScroll = (parameter) => {
    if (parameter === "diamonds") {
      document.getElementById("payment")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      document.getElementById("packages")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const [userPlayerId, setUserPlayerId] = useState('');
  const [diamondPackagePrice, setDiamondPackagePrice] = useState(61);
  const [diamondPackage, setDiamonPackage] = useState('583')
  const [firstDiamondPackage, setFirstDiamondPackage] = useState(true)
  const [secondDiamondPackage, setSecondDiamondPackage] = useState(false)
  const [thirdDiamondPackage, setThirdDiamondPackage] = useState(false)
  const [fourthDiamondPackage, setFourthDiamondPackage] = useState(false)


  const handleChange = (e) => {
    setUserPlayerId(e.target.value);
  };

  // function handleDiamondPackage(parameter, booleanParam) {
  //   console.log(parameter)
  //   setBoolean(!booleanParam)
  //   setDiamondPackagePrice(parameter);
  // }

  function handlefirstDiamondPackage(parameter, booleanParam, packageParam){
    setFirstDiamondPackage(!booleanParam)
    setSecondDiamondPackage(false)
    setThirdDiamondPackage(false)
    setFourthDiamondPackage(false)
    setDiamondPackagePrice(parameter)
    setDiamonPackage(packageParam)
  }
  function handlesecondDiamondPackage(parameter, booleanParam, packageParam){
    setSecondDiamondPackage(!booleanParam)
    setFirstDiamondPackage(false)
    setThirdDiamondPackage(false)
    setFourthDiamondPackage(false)
    setDiamondPackagePrice(parameter)
    setDiamonPackage(packageParam)
  }
  function handlethirdDiamondPackage(parameter, booleanParam, packageParam){
    setThirdDiamondPackage(!booleanParam)
    setFirstDiamondPackage(false)
    setSecondDiamondPackage(false)
    setFourthDiamondPackage(false)
    setDiamondPackagePrice(parameter)
    setDiamonPackage(packageParam)
  }
  function handlefourthDiamondPackage(parameter, booleanParam, packageParam){
    setFourthDiamondPackage(!booleanParam)
    setFirstDiamondPackage(false)
    setSecondDiamondPackage(false)
    setThirdDiamondPackage(false)
    setDiamondPackagePrice(parameter)
    setDiamonPackage(packageParam)
  }
  

  
  return (
    <>
      <PageHeader />
      <div className="main-body-homepage" id="home">
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
          <button
            onClick={() => smoothScroll("diamonds")}
            className="main-body-homepage-button-buy-diamonds"
          >
            Buy Diamonds
          </button>
          <button
            onClick={() => smoothScroll("packages")}
            className="main-body-homepage-button-view-packages"
          >
            View Packages
          </button>
        </div>
      </div>

      <section className="main-body-user-orders-container" id="order">
        <div
          className="player-id-container-and-select-package-container"
          id="packages"
        >
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
              type="number"
              name="userPlayerId"
              placeholder="Make sure to enter an accurate player Id"
              className="player-input"
              value={userPlayerId}
              onChange={handleChange}
              maxLength={10}
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
              <div
                className={`package-option-diamonds ${firstDiamondPackage ? 'firstDiamondPackage' :''}`}
                onClick={() => handlefirstDiamondPackage(61, firstDiamondPackage, 583)}
              >
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">583 diamonds</h2>
                <p className="package-option-diamonds-price">₵61.00</p>
              </div>
              <div
                className={`package-option-diamonds ${secondDiamondPackage ? 'secondDiamondPackage' :''}`}
                onClick={() => handlesecondDiamondPackage(120, secondDiamondPackage, 1188)}
              >
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">1188 diamonds</h2>
                <p className="package-option-diamonds-price">₵120.00</p>
              </div>
              <div
                className={`package-option-diamonds ${thirdDiamondPackage ? 'thirdDiamondPackage' :''}`}
                onClick={() => handlethirdDiamondPackage(240, thirdDiamondPackage, 2420)}
              >
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">2420 diamonds</h2>
                <p className="package-option-diamonds-price">₵240.00</p>
              </div>
              <div
                className={`package-option-diamonds ${fourthDiamondPackage ? 'fourthDiamondPackage' :''}`}
                onClick={() => handlefourthDiamondPackage(590, fourthDiamondPackage, 6160)}
              >
                <img
                  src={diamondsImage}
                  alt="Diamonds"
                  className="diamonds-image"
                />
                <h2 className="package-option-diamonds-title">6160 diamonds</h2>
                <p className="package-option-diamonds-price">₵590.04</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary-container" id="payment">
          <h2 className="order-summary-title">ORDER SUMMARY</h2>
          <div className="order-summary-items-and-values">
            <p className="order-summary-item">Player ID</p>
            <p className="order-summary-value">{userPlayerId || ''}</p>
          </div>
          <div className="order-summary-items-and-values">
            <p className="order-summary-item">Package</p>{" "}
            <p className="order-summary-value">{diamondPackage} Diamonds</p>
          </div>
          <div className="order-summary-items-and-values last">
            <p className="order-summary-item">Price</p>{" "}
            <p className="order-summary-value">₵{diamondPackagePrice}</p>
          </div>
          <div className="order-summary-items-and-values-total-container">
            <h2 className="order-summary-total-text">TOTAL</h2>
            <p className="order-summary-value-grand-total">$1.99</p>
          </div>
          <div className="order-summary-phone-number-container">
            {/* <h2 className="order-summary-item">Phone Number</h2>
            <input
              type="number"
              placeholder="Enter Phone Number"
              className="player-input user-phone-number-input"
            /> */}
            <button className="order-summary-confirm-button">
              <p>PAY WITH PAYSTACK</p>
              <svg
                className="money-icon"
                xmlns="http://w3.org"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3 6a1 1 0 0 0-1 1v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-1H4a1 1 0 0 1-1-1V6z"
                  opacity="0.8"
                />
                <path
                  fill-rule="evenodd"
                  d="M6 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6zm8 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="why-choose-flex-pay-container" id="why-choose">
        <h2 className="why-choose-flex-pay-title">WHY CHOOSE FLEX PAY?</h2>

        <div className="why-choose-reasons-container">
          <div className="why-choose-reason">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12a9 9 0 1 1 18 0" />

                <line x1="12" y1="12" x2="17" y2="7" />

                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>
            <p className="why-choose-reason-title">Fast Delivery</p>
            <p className="why-choose-reason-description">
              Your diamonds are sent to your account within 2-5 minutes of
              payment confirmation. Instant adrenaline.
            </p>
          </div>

          <div className="why-choose-reason">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6z" />

                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <p className="why-choose-reason-title">Secure Payments</p>
            <p className="why-choose-reason-description">
              Encrypted transactions via Paystack and local gateways. Your
              financial safety is our top priority.
            </p>
          </div>

          <div className="why-choose-reason">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11a8 8 0 0 1 16 0" />

                <path d="M4 11v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-3" />

                <path d="M16 11v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-3" />

                <circle cx="12" cy="11" r="2.5" />

                <path d="M9 17c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" />
              </svg>
            </div>
            <p className="why-choose-reason-title">24/7 Support</p>
            <p className="why-choose-reason-description">
              Our support squad is always online to help you with any issues. We
              never go AFK on our users.
            </p>
          </div>
        </div>
      </div>

      <div className="team-members-container">
        <h2 className="team-members-title">MEET THE TEAM</h2>

        <div className="team-members-info" id="team">
          <div className="team-member">
            <img
              src="./team_images/testiminial_1.jpg"
              alt="Team Member"
              className="team-member-image"
            />
            <div>
              <p className="team-members-name">Paul Foli</p>
              <p className="team-member-role">—Web Developer</p>
            </div>
          </div>

          <div className="team-member">
            <img
              src="./team_images/testiminial_2.jpeg"
              alt="Team Member"
              className="team-member-image"
            />
            <div>
              <p className="team-members-name">ALbert Grant</p>
              <p className="team-member-role">—Top-Up Agent</p>
            </div>
          </div>
        </div>

        <div className="contact-us-container" id="contact">
          <h2 className="contact-us-title">Need Support?</h2>
          <div className="contact-us-item">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
            <a
              href={`mailto:beltartrangzaddie@gmail.com?subject=${encodeURIComponent("Flexpay26 Support")}&body=${encodeURIComponent("Hello Flexpay26 Support Team,\n\nI need assistance with...")}`}
            >
              beltartrangzaddie@gmail.com
            </a>
          </div>
          <div className="contact-us-item">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            <a
              href="https://wa.me/0535926843"
              target="_blank"
              rel="noopener noreferrer"
            >
              0535926843
            </a>
          </div>

          <div className="contact-us-item">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02z" />
            </svg>
            <a href="tel:0593591255">0593591255</a>
          </div>
        </div>
      </div>

      <SiteFooter></SiteFooter>
    </>
  );
}
