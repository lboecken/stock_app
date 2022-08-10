import React from "react";
import StockCard from "./StockCard/StockCard";
import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
import tradepageMsg from "../Images/tradepage_msg.png";

const HoldingsList = ({
  userHoldings,
  runSearch,
  setComponentSearch,
  onSearch,
  getHoldingsData,
  setLoading,
  loading
}) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setLoading(false);
    } else {
      isMounted.current = true;
    }
  }, [userHoldings]);

  console.log(userHoldings.holdings);
  console.log(loading)

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center p-2">
      {(userHoldings.holdings === undefined  ||
      userHoldings.holdings.length === 0) && !loading? (
        <img
          id="placeholder-img"
          src={tradepageMsg}
          style={{ opacity: "20%" }}
        ></img>
      ) : (
        userHoldings?.holdings?.map((holdings, id) => {
          return (
            <StockCard
              key={id}
              // user_id={userId}
              companyName={holdings?.company_name}
              companySymbol={holdings?.company_symbol}
              currentShares={holdings?.current_shares}
              currentPrice={holdings?.current_price}
              totalCostBasis={holdings?.total_cost_basis}
              runSearch={runSearch}
              setComponentSearch={setComponentSearch}
              onSearch={onSearch}
              getHoldingsData={getHoldingsData}
            />
          );
        })
      )}
    </div>
  );
};

export default HoldingsList;
