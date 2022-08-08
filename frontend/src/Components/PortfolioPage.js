import React, { useDebugValue } from "react";
import "../Components/Dashboard/Dashboard.css";
import DashboardNavBar from "./Dashboard/DashboardNavbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { dollarFormat } from "./Handlers";
import useUser from "./useUser";
import AnimatedNumber from "react-animated-number";
import { capitalize } from "./Handlers";
import PortfolioCharts from "./PortfolioCharts";
import "./PortfolioPage.css";
// import useHoldings from "../hooks/useHoldings";
import { useOutletContext } from "react-router-dom";

const PortfolioPage = () => {
  const [userCashBalance, setUserCashBalance] = useState(0);
  const { signedInUser } = useUser();
  const { holdings } = useOutletContext()
  const {
    totalHoldings,
    totalHoldingsValue,
    updateHoldings,
  } = holdings

  const allHoldings = totalHoldingsValue + userCashBalance;

  useEffect(() => {
    updateHoldings();
    getCashBalance();
    // getAllStocks();
  }, []);



  // async function getHoldingsData() {
  //   await axios.get("api/holdings/" + signedInUser).then((res) => {
  //     setTotalHoldingsValue(res.data.total_value);
  //     setTotalHoldings(res.data);

  //     console.log(res.data);
  //   });
  // }

  async function getCashBalance() {
    await axios.get("api/cash_balance/" + signedInUser).then((res) => {
      // console.log(res.data[0].cash_balance);
      setUserCashBalance(Number(res.data[0].cash_balance));
      // console.log(signedInUser);
    });
  }

  // async function getAllStocks() {
  //   await axios.get("api/stocklist").then((res) => {
  //     console.log(res.data)
  //   });
  // }

  return (
    <div className="body-font">
      <DashboardNavBar />

      <Fade bottom duration={1000} delay={200} distance="30px">
        <div className="my-4" style={{ fontSize: "35px" }}>
          {capitalize(signedInUser)}'s Portfolio
        </div>

        <div className="d-flex mb-3 justify-content-center align-items-center">
          {/* Cash Balance
      Total Holdings */}
        </div>
        <div className="">
          <PortfolioCharts totalHoldings={totalHoldings} />
        </div>

        {/* <div>Total Holdings:{dollarFormat.format(totalholdings)}</div> */}
      </Fade>
    </div>
  );
};

export default PortfolioPage;
