import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "./Spinner";
import { dollarFormat } from "./Handlers";

const PortfolioCharts = ({ totalHoldings }) => {
  let shares_bar_chart_data = [["Company Symbol", "Shares"]];
  let shares_pie_chart_data = [["Symbol", "Cost_Basis"]];
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMounted.current) {
      console.log("current");
      setLoading(false);
    } else {
      isMounted.current = true;
    }
  }, [totalHoldings]);

  totalHoldings?.holdings?.map((holdings) => {
    shares_bar_chart_data.push([
      holdings?.company_symbol,
      holdings?.current_shares,
    ]);
    shares_pie_chart_data.push([
      holdings?.company_symbol,
      Number(holdings?.total_cost_basis),
    ]);
  });

  const options = {
    chartArea: { width: "50%", height: "70%" },
  };

  // console.log(totalHoldings);
  // console.log(shares_bar_chart_data)
  // console.log(shares_pie_chart_data)

  return (
    <div className="container">
    <div className="mx-auto justify-content-center align-items-center">
      <Tabs>
        <TabList>
          <Tab>Shares Value Distribution</Tab>
          <Tab>Shares Owned Distribution</Tab>
          {/* <Tab>Initial Cost Basis vs Current Holdings Value</Tab> */}
        </TabList>

        <TabPanel>
          <div className="mt-2" style={{ fontSize: "20px" }}>
            Shares Value Distribution
          </div>
          {loading ? (
            <div className="mt-5">
              <Spinner />
            </div>
          ) : (
            
              <Chart
                chartType="PieChart"
                data={shares_pie_chart_data}
                // options={options}
                width="100%"
                height="400px"
              />
            
          )}
        </TabPanel>
        <TabPanel>
          <div className="mt-2 mb-4" style={{ fontSize: "20px" }}>
            Shares Owned Distribution
          </div>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={shares_bar_chart_data}
            // options={options}
          />
        </TabPanel>
      </Tabs>
    </div>
    </div>
  );
};

export default PortfolioCharts;
