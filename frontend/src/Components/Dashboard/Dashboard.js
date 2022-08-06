import React, { useEffect, useState } from "react";
import "../Dashboard/DashboardNavbar";
import "../Dashboard/Dashboard.css";
import DashboardNavBar from "./DashboardNavbar";
import HoldingsTable from "./HoldingsTable";
import axios from "axios";
import useUser from "../useUser";
import { capitalize } from "../Handlers";
import AccountOverview from "./AccountOverview";
import PortfolioCharts from "../PortfolioCharts";
import { useOutletContext } from "react-router-dom";
// import io from "socket.io-client";
// import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { signedInUser } = useUser();
  // const socket = io.connect();

  // const {setToken, setSignedInUser} = useOutletContext()

  const { holdings, cashBalance } = useOutletContext();
  const { totalHoldings, updateHoldings } = holdings;

  useEffect(() => {
    updateHoldings();
  }, []);

  console.log(totalHoldings);

  // async function getUsers() {
  //   await axios.get("api/users").then((res) => {
  //     setUsers(res.data);
  //     console.log(users);
  //   });
  // }

  return (
    <div className="body-font">
      <DashboardNavBar />
      <div className="container dash-container d-flex flex-column">
        {/* <div className="align-items-start">Dashboard</div> */}
        <div className="welcome-title">Welcome {capitalize(signedInUser)}!</div>
        <div className="my-5">
          <AccountOverview />
        </div>

        {/* <div><PortfolioCharts/></div> */}

        <div className="row mt-auto mb-5">
          <div>
            {/* <HoldingsTable userHoldings={userHoldings} /> */}
            <HoldingsTable userHoldings={totalHoldings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
