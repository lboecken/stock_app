import React, { useEffect, useState } from "react";
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
    chartArea: { width: "50%", height: "70%" },
  };

  return (
    <>
      <div className="container">
        <div className="row card-header">
          {/* <div className="card-header d-flex justify-content-between"> */}

          {/* <div className="col-4 d-flex justify-content-between"> */}
          <div className="col-sm mt-2">

          <img className="logo-size" src={testLogo}></img>
          </div>
          <div className="col-sm mt-2">
            <div>{truncate(companyName)}</div>
            <div>{`(${companySymbol})`}</div>
          </div>
          <div className="col-sm mt-2">
            <div>Current Price</div>
            <div>{dollarFormat.format(latestPrice)}</div>
          </div>
          <div
            className="col-sm mt-2"
            style={trendingUp ? { color: "green" } : { color: "red" }}
          >
            <div> Price Change </div>

            <div className="trend-padding">
              {/* <div className="col-4 trend-padding"> */}
              {trend} {dollarFormat.format(priceChange)}
            </div>
          </div>
        </div>
      <Chart
        // key={key}
        chartType="AreaChart"
        width="100%"
        height="400px"
        // height="100%"
        data={stock_data}
        options={options}
      />
      </div>
    </>

  );
};

export default Charts;
