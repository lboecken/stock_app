import React, { useEffect, useState, useRef } from "react";
import "../Dashboard/DashboardNavbar";
import "../Dashboard/Dashboard.css";
import DashboardNavBar from "./DashboardNavbar";
import HoldingsTable from "./HoldingsTable";
import useUser from "../useUser";
import { capitalize } from "../Handlers";
import Fade from "react-reveal/Fade";
import AccountOverview from "./AccountOverview";
import { useOutletContext, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import SharesPieChart from "../SharesPieChart";
import Spinner from "../Spinner";
import dashboardMsg from "../../Images/dashboard_msg.png"

const Dashboard = () => {
  const { signedInUser } = useUser();
  const { holdings, cashBalance } = useOutletContext();
  const { totalHoldings, updateHoldings, totalHoldingsValue } = holdings;
  const { userCashBalance, updateCashBalance } =
    cashBalance;
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMounted.current) {
     
      setLoading(false);
    } else {
      isMounted.current = true;
    }
  }, [totalHoldings]);

  useEffect(() => {
    updateHoldings();
    updateCashBalance();
  }, []);

  

  return (
    <div className="body-font">
      <DashboardNavBar />
      <div className="container">
        {/* <div className="align-items-start">Dashboard</div> */}
        <div className="mt-3 welcome-title">Welcome {capitalize(signedInUser)}!</div>
        <div className="row">
          <div className="my-5 col-lg-4">
            <AccountOverview
              totalHoldings={totalHoldings}
              totalHoldingsValue={totalHoldingsValue}
              cashBalance={userCashBalance}
              updateCashBalance={updateCashBalance}
            />
          </div>

          {loading ? (
            ""
          ) : totalHoldings.holdings === undefined ||
            totalHoldings.holdings.length === 0 ? (

            <img src={dashboardMsg} style={{opacity:"20%"}}></img>
          ) : (
            <Fade bottom duration={2000} delay={100} distance="30px">
              <div className="col-lg-8 pie-chart">
                <SharesPieChart />

                <Link to="/portfolio">
                  <Button className="manage-button mt-1 view-portfolio">
                    View Full Portfolio
                  </Button>
                </Link>
              </div>
            </Fade>
          )}
        </div>

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
