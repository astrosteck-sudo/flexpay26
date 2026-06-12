import { LoginHeader } from "../Logins/LoginHeader";
import { PageHeader } from "../PageHeader/PageHeader";
import { getInitials } from "../utils/initials";
import { SiteFooter } from "../SiteFooter/SiteFooter.jsx";
import dayjs from "dayjs";
import "./UserDashBoard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios.js";
import { UserRecentOrders } from "./UserRecentOrders.jsx";
import { use } from "react";

//import { logout } from '../utils/auth.js'

export function UserDashBoard() {
  const [logout, setLogOut] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [dashBoardLimit, setDashBoardLimit] = useState(4);//THIS HANDLES HOW MANY RECENT ACTIVITIES OF THE USER CAN BE SHOWN
  const [isViewAll, setIisViewAll] = useState(false)
  const navigate = useNavigate();
  //const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  function handleLogOutModal() {
    if (logout) {
      setLogOut(false);
    } else {
      setLogOut(true);
    }
  }

  useEffect(() => {
    function handleClick(event) {
      if (
        !event.target.closest(".user-dashboard-logut-container") &&
        !event.target.closest(".user-dashboard-header")
      ) {
        setLogOut(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setLogOut]);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/orders/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Dashboard data:", response.data);
      console.log(response.data.stats)
      setDashboardInfo(response.data); // update state
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  function handleViewAllButton(){
    if(isViewAll){
      setIisViewAll(false)
      setDashBoardLimit(4)
    }else{
      setIisViewAll(true)
      setDashBoardLimit(dashboardInfo.orders.length)
    }
  }

  return (
    <>
      <div className="user-dashboard-header">
        <a href="/">
          <svg
            className="right-arrow-svg"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="11 6 5 12 11 18" />
          </svg>
        </a>

        <div className="pageheader-site-name">FLEXPAY26</div>

        <div className="user-dashboard-logout" onClick={handleLogOutModal}>
          Log out
        </div>
      </div>

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
            <p>¢{dashboardInfo.stats?.total_spent || 0.00}</p>
          </div>
          <div className="user-dashboard-user-total-diamonds">
            <p>Total Diamonds Used</p>
            <p>{dashboardInfo.stats?.total_diamonds || 0}</p>
          </div>
        </div>
      </div>

      <div className="user-dashboard-recent-activity-container">
        <div className="user-dashboard-recent-activity-header">
          <p>Recent Activity</p>
          <p onClick={handleViewAllButton}>{isViewAll? 'View Less':'View All'}</p>
        </div>

        <div className="user-dashboard-recent-activity-wrapper">
          {dashboardInfo.orders?.slice(0, dashBoardLimit).map((order) => (
            <UserRecentOrders order={order} key={order.id}/>
          ))}
        </div>
      </div>

      <div
        className={`user-dashboard-logout-prompt ${logout ? "open" : "close"}`}
      >
        <div className="user-dashboard-logut-container">
          <p>Log Out</p>

          <p>Are you sure you want to log out?</p>

          <div className="user-dashboard-logut-buttons">
            <button onClick={() => setLogOut(false)}>Cancel</button>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
