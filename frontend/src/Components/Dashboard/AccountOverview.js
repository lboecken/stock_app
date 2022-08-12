import React, { useState, useEffect } from "react";
import { dollarFormat } from "../Handlers";
import useUser from "../useUser";
import AnimatedNumber from "react-animated-number";
import { useOutletContext } from "react-router-dom";
const AccountOverview = () => {
  const { holdings, cashBalance } = useOutletContext();
  const { userCashBalance, updateCashBalance } = cashBalance
  const {totalHoldingsValue, allHoldings } = holdings;

  useEffect(() => {
    // updateCashBalance()
  }, []);

  return (
    <div id="account-info">
      <div className="">
      <div className="card-header center-header py-2">Account Overview</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div className="mr-3 p-2">Cash Balance:</div>
            <div className="p-1">
              <AnimatedNumber
                component="text"
                initialValue={0}
                value={userCashBalance}
                stepPrecision={0}
                style={{
                  transition: "0.8s ease-out",
                  fontSize: 25,
                  transitionProperty: "background-color, color, opacity",
                }}
                duration={1000}
                formatValue={(n) => dollarFormat.format(n)}
              />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div className="mr-3 p-2">Value of All Shares: </div>
            <div className="p-1">
              <AnimatedNumber
                component="text"
                initialValue={0}
                value={totalHoldingsValue}
                stepPrecision={0}
                style={{
                  transition: "0.8s ease-out",
                  fontSize: 25,
                  transitionProperty: "background-color, color, opacity",
                }}
                duration={1000}
                formatValue={(n) => dollarFormat.format(n)}
              />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div className="p-2">Total Holdings:</div>

            <div className="p-1">
              <AnimatedNumber
                component="text"
                initialValue={0}
                value={allHoldings}
                stepPrecision={0}
                style={{
                  transition: "0.8s ease-out",
                  fontSize: 25,
                  transitionProperty: "background-color, color, opacity",
                }}
                duration={1000}
                formatValue={(n) => dollarFormat.format(n)}
              />
            </div>
          </div>
        </li>
      </ul>
      </div>
    </div>
  );
};

export default AccountOverview;
