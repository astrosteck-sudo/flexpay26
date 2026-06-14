import { useEffect, useState } from "react";
import api from "../axios";
import { LoginHeader } from "../Logins/LoginHeader";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./ManagerDashboard.css";
import { AllUsersOrders } from "./AllUsersOrders";
import { CompletedUsers } from "./CompletedUsers";
import { useNavigate } from "react-router-dom";

export function ManagerDashboard() {
  const [allUsersOrder, setAllUsersOrder] = useState([]);
  const [pendingOption, setPendingOption] = useState(true);
  const [completedOption, setCompletedOption] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [logout, setLogOut] = useState(false);
  const navigate = useNavigate();
  function handleLogOutModal() {
    if (logout) {
      setLogOut(false);
    } else {
      setLogOut(true);
    }
  }
  const getAllUsersOrders = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/orders/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log(response.data.orders);
    setAllUsersOrder(response.data.orders);
  };

  function handlePendingOption() {
    if (pendingOption) {
      setPendingOption(false);
      setCompletedOption(true);
    } else {
      setPendingOption(true);
      setCompletedOption(false);
    }
  }
  function handleCompletedOption() {
    if (completedOption) {
      setPendingOption(true);
      setCompletedOption(false);
    } else {
      setPendingOption(false);
      setCompletedOption(true);
    }
  }

  const getCompletedOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/orders/admin/orders/completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.orders);
      setCompletedOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (getAllUsersOrders(), getCompletedOrders());
  }, []);


  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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

      <div className="manager-dashboard">
        <div className="manager-dashboard-status-container">
          <div>
            <h2>PROCESSED ORDERS</h2>
            <p>{completedOrders?.length}</p>
          </div>
          <div>
            <h2>PENDING ORDERS</h2>
            <p>{allUsersOrder?.length}</p>
          </div>
        </div>

        <div className="manager-dashboard-options-conatainer">
          <p
            onClick={handlePendingOption}
            className={`manager-dashboard-options ${pendingOption ? "pending" : ""}`}
          >
            Pending
          </p>
          <p
            onClick={handleCompletedOption}
            className={`manager-dashboard-options ${completedOption ? "completed" : ""}`}
          >
            Completed
          </p>
        </div>

        <div
          className={`manager-dashboard-orders-container ${pendingOption ? "" : "hide"}`}
        >
          {allUsersOrder?.map((order) => {
            return (
              <AllUsersOrders
                order={order}
                getAllUsersOrders={getAllUsersOrders}
              />
            );
          })}
        </div>

        <div
          className={`manager-dashboard-completed-orders-container ${completedOption ? "" : "hide"}`}
        >
          {completedOrders?.map((order) => {
            return <CompletedUsers order={order} />;
          })}
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
