import React from "react";
import "../Dashboard/DashboardNavbar";
import "../Dashboard/Dashboard.css";
import DashboardNavBar from "./DashboardNavbar";
import HoldingsTable from "./HoldingsTable";

const Dashboard = () => {
  return (
    <div className="body-font">
      <DashboardNavBar />
      <div className="container dash-container d-flex flex-column">
        <div className="align-items-start">Dashboard</div>
        <div className="row mt-auto mb-5">
          <div className="">
            <HoldingsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
