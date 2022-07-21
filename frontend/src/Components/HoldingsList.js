import React from "react";
import StockCard from "./StockCard/StockCard";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const HoldingsList = ({
  userHoldings,
  runSearch,
  setComponentSearch,
  onSearch,
  getStockDetails,
  stockDetails,
}) => {

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center p-2">
      {userHoldings?.map((holdings, id) => {
      
        return (
          <StockCard
            key={id}
            // user_id={userId}
            companyName={holdings?.company_name}
            companySymbol={holdings?.company_symbol}
            currentShares={holdings?.current_shares}
            totalCostBasis={holdings?.total_cost_basis}
            runSearch={runSearch}
            setComponentSearch={setComponentSearch}
            onSearch={onSearch}
            getStockDetails={getStockDetails}
            stockDetails={stockDetails}
            // latestPrice={}
          />
        );
      })}
    </div>
  );
};

export default HoldingsList;
