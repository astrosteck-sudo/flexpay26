import { LoginHeader } from "../Logins/LoginHeader";
import { PageHeader } from "../PageHeader/PageHeader";
import { getInitials } from "../utils/initials";
import { SiteFooter } from "../SiteFooter/SiteFooter.jsx";
import dayjs from "dayjs";
import "./UserDashBoard.css";

export function UserDashBoard() {
  //const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <>
      <LoginHeader />
      <div className="user-dashBoard-container">
        <div className="user-dashboard-user-info-container">
          <div className="user-dashboard-initials">
            {getInitials(user.username)}
          </div>
          <div className="user-dashboard-user-info">
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{dayjs(user.createdAt).format("MMMM D, YYYY")}</p>
          </div>
        </div>

        <div className="user-dashboard-user-expenditure">
          <div className="user-dashboard-user-total-cash">
            <p>TOTAL CASH SPENT</p>
            <p>$500</p>
          </div>
          <div className="user-dashboard-user-total-diamonds">
            <p>Total Diamonds Used</p>
            <p>1500</p>
          </div>
        </div>
      </div>

      <div className="user-dashboard-recent-activity-container">
        <div className="user-dashboard-recent-activity-header">
          <p>Recent Activity</p>
          <p>VIEW ALL</p>
        </div>

        <div className="user-dashboard-recent-activity-wrapper">
          <div className="user-dashboard-recent-activity">
            <div className="user-dashboard-recent-activity-diamsonds-info">
              <div className="user-dashboard-recent-activity-svg-container">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="user-dashboard-recent-activity-svg"
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
              </div>
              <div className="user-dashboard-recent-activity-diamsonds">
                <p>500 Diamonds Top-up</p>
                <p>Nov 24, 2023 • 14:32</p>
              </div>
            </div>
            <div className="user-dashboard-recent-activity-money-container">
              <div className="user-dashboard-recent-activity-money">
                <p>$4.99</p>
                <p>Mobile Money</p>
              </div>
              <p className="user-dashboard-recent-activity-completed">
                Completed
              </p>
            </div>
          </div>

          <div className="user-dashboard-recent-activity">
            <div className="user-dashboard-recent-activity-diamsonds-info">
              <div className="user-dashboard-recent-activity-svg-container">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="user-dashboard-recent-activity-svg"
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
              </div>
              <div className="user-dashboard-recent-activity-diamsonds">
                <p>500 Diamonds Top-up</p>
                <p>Nov 24, 2023 • 14:32</p>
              </div>
            </div>
            <div className="user-dashboard-recent-activity-money-container">
              <div className="user-dashboard-recent-activity-money">
                <p>$4.99</p>
                <p>Mobile Money</p>
              </div>
              <p className="user-dashboard-recent-activity-completed">
                Completed
              </p>
            </div>
          </div>

          <div className="user-dashboard-recent-activity">
            <div className="user-dashboard-recent-activity-diamsonds-info">
              <div className="user-dashboard-recent-activity-svg-container">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="user-dashboard-recent-activity-svg"
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
              </div>
              <div className="user-dashboard-recent-activity-diamsonds">
                <p>500 Diamonds Top-up</p>
                <p>Nov 24, 2023 • 14:32</p>
              </div>
            </div>
            <div className="user-dashboard-recent-activity-money-container">
              <div className="user-dashboard-recent-activity-money">
                <p>$4.99</p>
                <p>Mobile Money</p>
              </div>
              <p className="user-dashboard-recent-activity-completed">
                Completed
              </p>
            </div>
          </div>

          
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
