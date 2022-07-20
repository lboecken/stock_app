import React from "react";
import StockCard from "./StockCard/StockCard";

const HoldingsList = ({
  userHoldings,
  runSearch,
  setComponentSearch,
  onSearch
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
            latestPrice={holdings?.latestPrice}
            currentShares={holdings?.current_shares}
            totalCostBasis={holdings?.total_cost_basis}
            runSearch={runSearch}
            setComponentSearch={setComponentSearch}
            onSearch={onSearch}
          />
        );
      })}
    </div>
  );
};

export default HoldingsList;