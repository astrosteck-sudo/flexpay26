import { useEffect, useState } from "react";
import api from "../axios";
import { LoginHeader } from "../Logins/LoginHeader";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./ManagerDashboard.css";
import { AllUsersOrders } from "./AllUsersOrders";
import { CompletedUsers } from "./CompletedUsers";

export function ManagerDashboard() {
  const [allUsersOrder, setAllUsersOrder] = useState([]);
  const [pendingOption, setPendingOption] = useState(true);
  const [completedOption, setCompletedOption] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
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
      console.log(response.data.orders)
      setCompletedOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (getAllUsersOrders(), getCompletedOrders());
  }, []);
  return (
    <>
      <LoginHeader />

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
            return (
              <CompletedUsers
                order={order}
              />
            );
          })}
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
