import { useEffect, useState } from "react";
import api from "../axios";
import { LoginHeader } from "../Logins/LoginHeader";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import "./ManagerDashboard.css";
import { AllUsersOrders } from "./AllUsersOrders";

export function ManagerDashboard() {
  const [allUsersOrder, setAllUsersOrder] = useState([]);
  const getAllUsersOrders = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/orders/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.orders);
    setAllUsersOrder(response.data.orders);
  };

  useEffect(() => {
    getAllUsersOrders();
  }, []);
  return (
    <>
      <LoginHeader />

      <div className="manager-dashboard">
        <div className="manager-dashboard-status-container">
          <div>
            <h2>PROCESSED TODAY</h2>
            <p>1284</p>
          </div>
          <div>
            <h2>PENDING PROCESS</h2>
            <p>{allUsersOrder?.length}</p>
          </div>
        </div>

        <div className="manager-dashboard-options-conatainer">
          <p>Pending</p>
          <p>Completed</p>
        </div>

        <div className="manager-dashboard-orders-container">
          {allUsersOrder?.map((order) => {
            return <AllUsersOrders order={order} />;
          })}
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
