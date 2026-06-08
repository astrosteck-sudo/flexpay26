import { LoginHeader } from "../Logins/LoginHeader";
import { PageHeader } from "../PageHeader/PageHeader";
import { getInitials } from "../utils/initials";
import { SiteFooter } from '../SiteFooter/SiteFooter.jsx'
import dayjs from "dayjs";
import "./UserDashBoard.css";

export function UserDashBoard() {
  //const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  return (
    <>
      <LoginHeader />
      <div className="user-dashBoard-container">
        <div className="user-dashboard-user-info-container">
          <div className="user-dashboard-initials">{getInitials(user.username)}</div>
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
        <p>Recent Activity</p>

        <div>

        </div>
      </div>
      
      <SiteFooter/>
    </>
  );
}
