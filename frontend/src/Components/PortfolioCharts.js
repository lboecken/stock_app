import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "./Spinner";
import useUser from "./useUser";
import { dollarFormat, chartColors } from "./Handlers";
// import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import SharesPieChart from "./SharesPieChart";
import { useOutletContext } from "react-router-dom";

const PortfolioCharts = () => {
  let shares_bar_chart_data = [["Company Symbol", "Shares", { role: "style" }]];
  let shares_pie_chart_data = [["Symbol", "Cost_Basis"]];
  const { signedInUser } = useUser();

  const { holdings, cashBalance } = useOutletContext();
  const { totalHoldings, totalHoldingsValue, updateHoldings } = holdings;
  const { userCashBalance, updateCashBalance } = cashBalance;

  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);
  let totalCapitalGains = totalHoldingsValue - Number(totalHoldings.total_cost);
  const allHoldings = totalHoldingsValue + userCashBalance;

  useEffect(() => {
    // getHoldingsData();
    // updateHoldings();
    // getCashBalance();
    updateCashBalance();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
     
      setLoading(false);
    } else {
      isMounted.current = true;
    }
  }, [totalHoldings, totalHoldingsValue]);

  totalHoldings?.holdings?.map((holdings, index) => {
    shares_bar_chart_data.push([
      holdings?.company_symbol,
      holdings?.current_shares,
      chartColors[index],
    ]);
   
  });

  console.log(shares_bar_chart_data);

  const options = {
    chartArea: { width: "50%", height: "70%" },
  };

  return (
    <div className="container">
      <div className="mx-auto justify-content-center align-items-center">
        <Tabs>
          <TabList>
            <Tab>Shares Value Distribution</Tab>
            <Tab>Shares Owned Distribution</Tab>
            <Tab>Total Capital Gains</Tab>
            <Tab>Cash Balance</Tab>
            <Tab>Total Holdings</Tab>
          </TabList>

          <TabPanel>
            <div className="mt-2" style={{ fontSize: "25px" }}>
              Shares Value Distribution
            </div>
            {loading ? (
              <div className="mt-5">
                <Spinner />
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-center">
                  <div className="mr-3" style={{ fontSize: "18px" }}>
                    Value of All Shares:
                  </div>
                  <div style={{ fontSize: "18px" }}>
                    {dollarFormat.format(totalHoldingsValue)}
                  </div>
                </div>

                <div>
                  <SharesPieChart />
                </div>
              </div>
            )}

          
          </TabPanel>
          <TabPanel>
            <div className="mt-2 mb-4" style={{ fontSize: "25px" }}>
              Shares Owned Distribution
            </div>
            {shares_bar_chart_data.length === 1 ? (
              <div>
                No Current Share Holdings. Go To Trade Page to Buy Your First Stock.
              </div>
            ) : (
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={shares_bar_chart_data}
                // options={barOptions}
              />
            )}
          </TabPanel>
          <TabPanel>
            <div className="mt-2 mb-2" style={{ fontSize: "25px" }}>
              Total Capital Gains
            
            </div>
            <div className="mr-3" style={{ fontSize: "18px" }}>
              (Total Cost Basis vs. Current Market Value)
            </div>
            <Flip bottom>
              <div
                style={
                  !(Math.sign(totalCapitalGains) === -1)
                    ? { fontSize: "100px", color: "green" }
                    : { fontSize: "100px", color: "red" }
                }
              >
                {dollarFormat.format(totalCapitalGains)}
              </div>
            </Flip>
            <div className="container">
              <div className="row no-gutters">
                <div className="col-sm">
                  <div style={{ fontSize: "18px" }}>Cost Basis:</div>
                  <div> {dollarFormat.format(totalHoldings.total_cost)}</div>
                </div>
                <div className="col-sm">
                  <div style={{ fontSize: "18px" }}>Market Value:</div>
                  <div>{dollarFormat.format(totalHoldingsValue)}</div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-2 mb-2" style={{ fontSize: "25px" }}>
              Cash Balance:
            </div>
            <Flip bottom>
              <div style={{ fontSize: "100px", color: "green" }}>
                {dollarFormat.format(userCashBalance)}
              </div>
            </Flip>
            
          </TabPanel>
          <TabPanel>
            <div className="mt-2 mb-2" style={{ fontSize: "25px" }}>
              Total Holdings:
            </div>
            <Flip bottom>
              <div style={{ fontSize: "100px", color: "green" }}>
                {dollarFormat.format(allHoldings)}
              </div>
            </Flip>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioCharts;
