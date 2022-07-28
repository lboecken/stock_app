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

const PortfolioPage = () => {
  const [totalholdings, setTotalHoldings] = useState(0);
  const { signedInUser } = useUser();

  useEffect(() => {
    getHoldingsData();
  }, []);

  async function getHoldingsData() {
    await axios.get("api/holdings/" + signedInUser).then((res) => {
      setTotalHoldings(res.data.total_value);

      console.log(res.data);
    });
  }

  return (
    <div className="body-font">
      <DashboardNavBar />

      <Fade bottom duration={1000} delay={200} distance="30px">
        <div className="my-4" style={{fontSize:"30px"}}>{capitalize(signedInUser)}'s Portfolio</div>

        <div className="d-flex justify-content-center align-items-center">
          {/* Cash Balance
      Total Holdings */}
          <div>Total Value of All Shares: </div>
          <AnimatedNumber
            component="text"
            initialValue={50}
            value={totalholdings}
            stepPrecision={0}
            style={{
              transition: "0.8s ease-out",
              fontSize: 16,
              transitionProperty: "background-color, color, opacity",
            }}
            duration={1000}
            formatValue={(n) => dollarFormat.format(n)}
          />
        </div>

        {/* <div>Total Holdings:{dollarFormat.format(totalholdings)}</div> */}
      </Fade>
    </div>
  );
};

export default PortfolioPage;
