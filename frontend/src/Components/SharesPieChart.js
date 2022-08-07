import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import Spinner from "./Spinner";
import useUser from "./useUser";
import { dollarFormat } from "./Handlers";
// import Fade from "react-reveal/Fade";
import { useOutletContext } from "react-router-dom";

const SharesPieChart = () => {
  let shares_pie_chart_data = [["Symbol", "Cost_Basis"]];

  const { signedInUser } = useUser();

  const { holdings, cashBalance } = useOutletContext();
  const { totalHoldings, totalHoldingsValue, updateHoldings } = holdings;

//   const isMounted = useRef(false);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     if (isMounted.current) {
//       setLoading(false);
//     } else {
//       isMounted.current = true;
//     }
//   }, [totalHoldings, totalHoldingsValue]);

  totalHoldings?.holdings?.map((holdings) => {
    shares_pie_chart_data.push([
      holdings?.company_symbol,
      Number(holdings?.total_cost_basis),
    ]);
  });

  const options = {
    chartArea: { width: "100%", height: "70%" },
  };

  return (
    <div className="container">
      <div className="mx-auto justify-content-center align-items-center">
          <div>
            <Chart
              id="pie"
              chartType="PieChart"
              data={shares_pie_chart_data}
              width="100%"
              height="400px"
              options={options}
            />
          </div>
    
      </div>
    </div>
  );
};

export default SharesPieChart;
