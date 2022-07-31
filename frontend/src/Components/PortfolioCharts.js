import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "./Spinner";
import useUser from "./useUser";
import { dollarFormat, chartColors } from "./Handlers";
import AnimatedNumber from "react-animated-number";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const PortfolioCharts = () => {
  let shares_bar_chart_data = [["Company Symbol", "Shares", { role: "style" }]];
  let shares_pie_chart_data = [["Symbol", "Cost_Basis"]];
  // const [totalHoldingsValue, setTotalHoldingsValue] = useState(0);
  const { signedInUser } = useUser();

  const { holdings } = useOutletContext();
  const { totalHoldings, totalHoldingsValue, updateHoldings } = holdings;

  useEffect(() => {
    // getHoldingsData();
    // updateHoldings();
    // getCashBalance();
  }, []);

  // async function getHoldingsData() {
  //   await axios.get("api/holdings/" + signedInUser).then((res) => {
  //     setTotalHoldingsValue(res.data.total_value);
  //     // setTotalHoldings(res.data);

  //     console.log(res.data);
  //   });
  // }

  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let colorNum = 0

  // const indext = arr.findIndex(object => {
  //   return object.id === 'b';
  // });

  // const index = (arr) => {
  //   arr.findIndex(object => {
  //     return object.company_symbol === "DKS"
  //   })
  // }

  // totalHoldings?.holdings?.map((holdings, index) => {
  //   console.log(index)
  // })


  useEffect(() => {
    if (isMounted.current) {
      console.log("current");
      console.log(totalHoldingsValue);
      setLoading(false);
    } else {
      isMounted.current = true;
      console.log(totalHoldingsValue);
    }
  }, [totalHoldings, totalHoldingsValue]);

  totalHoldings?.holdings?.map((holdings, index) => {
    shares_bar_chart_data.push([
      holdings?.company_symbol,
      holdings?.current_shares,
      chartColors[index]
        
    ]);
    shares_pie_chart_data.push([
      holdings?.company_symbol,
      Number(holdings?.total_cost_basis),
    ]);
  });


  console.log(shares_bar_chart_data)

  const options = {
    chartArea: { width: "50%", height: "70%" },
  };

  const barOptions = {
    colors: ['green', 'blue', 'yellow'],
   
  }

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
            <div className="mt-2" style={{ fontSize: "25px" }}>
              Shares Value Distribution
              {totalHoldings ? (
                <div className="d-flex justify-content-center">
                  <div className="mr-3" style={{ fontSize: "18px" }}>
                    Value of All Shares:
                  </div>
                  <div style={{ fontSize: "18px" }}>
                    {dollarFormat.format(totalHoldingsValue)}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {loading ? (
              <div className="mt-5">
                <Spinner />
              </div>
            ) : (
              <Chart
                id="pie"
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
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={shares_bar_chart_data}
              // options={barOptions}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioCharts;
