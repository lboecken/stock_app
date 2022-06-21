import React from "react";
import { Chart } from "react-google-charts";

const stock = "Apple Inc";

const trendingUp = false;

const trend = "Trending " + "\u2B07"; // down arrow
// const trend = "Trending " + "\u2B06"; //up arrow

const options = {
  title: `Closing Prices for ${stock} in the past week. (${trend})`,
  titleTextStyle: {color: trendingUp ? "green" : "red"},
  curveType: "function",
  legend: { position: "right" },
  colors: trendingUp ? ["green"] : ["red"],
  hAxis: { title: "Date" },
  vAxis: { title: "Price in USD" },
  fillOpacity: 0.2,
};

const Charts = ({ test_data }) => {
  // console.log(test_data)

  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={test_data}
      options={options}
    />
  );
};

export default Charts;
