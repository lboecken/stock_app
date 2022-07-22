import React from "react";
import { Chart } from "react-google-charts";
import { truncate, dollarFormat } from "./Handlers";
import testLogo from "../Images/test-logo.png";

const Charts = ({
  stock_data,
  companyName,
  priceChange,
  latestPrice,
  companySymbol,
}) => {
  
  let trendingUp = "";
  let trend = "";


  if (Math.sign(priceChange) === -1) {
    trendingUp = false;
    trend = "\u25BC"; // down arrow
  } else {
    trendingUp = true;
    trend = "\u25B2"; //up arrow
  }

  const options = {
    annotations: {},
    title: `Closing Prices for ${companyName} in the past 5 days.`,
    // titleTextStyle: {color: trendingUp ? "green" : "red"},
    curveType: "function",
    legend: { position: "right", title: "Closing Prices" },
    colors: trendingUp ? ["green"] : ["red"],
    hAxis: { title: "Date" },
    vAxis: { title: "Price in USD" },
    pointSize: 10,
    areaOpacity: 0.2,
  };

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <div className="d-flex justify-content-between">
          <img className="logo-size logo-padding" src={testLogo}></img>
          <div>
            <div>{truncate(companyName)}</div>
            <div>{`(${companySymbol})`}</div>
          </div>
        </div>
        <div className="">
          <div>Current Price</div>
          <div>{dollarFormat.format(latestPrice)}</div>
        </div>
        <div style={trendingUp ? { color: "green" } : { color: "red" }}>
          <div> Price Change </div>

          <div className="trend-padding">
            {dollarFormat.format(priceChange)} {trend}
          </div>
        </div>
      </div>

      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={stock_data}
        options={options}
      />
    </>
  );
};

export default Charts;
