export function UserRecentOrders({ order }) {
  return (
    <>
      <div className="user-dashboard-recent-activity" key={order.id}>
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
          <p className="user-dashboard-recent-activity-completed">Completed</p>
        </div>
      </div>
    </>
  );
}
