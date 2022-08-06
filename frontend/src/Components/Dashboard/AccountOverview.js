import React, { useState, useEffect } from "react";
import { dollarFormat } from "../Handlers";
import useUser from "../useUser";
import axios from "axios";
import AnimatedNumber from "react-animated-number";
import { useOutletContext } from "react-router-dom";
const AccountOverview = () => {
  const [totalHoldingsValue, setTotalHoldingsValue] = useState(0);
  const [totalHoldings, setTotalHoldings] = useState(0);
  // const [userCashBalance, setUserCashBalance] = useState(0);
  const { signedInUser } = useUser();
  const { holdings, cashBalance } = useOutletContext();
  const { userCashBalance, updateCashBalance } = cashBalance

  const allHoldings = totalHoldingsValue + userCashBalance;

  useEffect(() => {
    getHoldingsData();
    updateCashBalance()
  }, []);

  async function getHoldingsData() {
    await axios.get("api/holdings/" + signedInUser).then((res) => {
      setTotalHoldingsValue(res.data.total_value);
    //   setTotalHoldings(res.data);

      console.log(res.data);
    });
  }

  // async function getCashBalance() {
  //   await axios.get("api/cash_balance/" + signedInUser).then((res) => {
  //     // console.log(res.data[0].cash_balance);
  //     setUserCashBalance(Number(res.data[0].cash_balance));
  //     // console.log(signedInUser);
  //   });
  // }

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
