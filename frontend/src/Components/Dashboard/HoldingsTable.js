import React from "react";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { Link, useNavigate } from "react-router-dom";
import { truncate, dollarFormat } from "../Handlers";
import { useEffect, useRef, useState } from "react";
import "./HoldingsTable.css";
import Spinner from "../Spinner";

const HoldingsTable = ({ userHoldings }) => {
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMounted.current) {
      console.log("current");
      setLoading(false);
    } else {
      isMounted.current = true;
    }
  }, [userHoldings]);

  return (
    <div className="mx-auto">
      {loading ? (
        <div>
          <h6 className="text-center">Loading Holdings Data...</h6>

          <Spinner />
        </div>
      ) : userHoldings.holdings === undefined ||
        userHoldings.holdings.length === 0 ? (
        ""
      ) : (
        <Fade bottom duration={1000} delay={100} distance="30px">
          <p style={{ fontSize: "18px" }} className="mt-2 mb-2">
            Current Holdings
          </p>
          <div style={{ border: "1px" }}>
            <div className="table-responsive-md tableFixHead">
              <table className=" table w-75 bg-light text-dark table-hover mx-auto">
                <thead className="thead-color">
                  <tr>
                    <th>Company</th>
                    <th>Current Shares</th>
                    <th>Current Price</th>
                    <th>Market Value</th>
                    <th>Cost Basis</th>
                    <th>Capital Gains</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {userHoldings?.holdings?.map((holding, index) => (
                    <tr key={index}>
                      <td>
                        {truncate(holding.company_name) +
                          ` (${holding.company_symbol})`}
                      </td>
                      <td>{holding.current_shares}</td>
                      <td>{dollarFormat.format(holding.current_price)}</td>
                      <td>{dollarFormat.format(holding.market_value)}</td>
                      <td>{dollarFormat.format(holding.total_cost_basis)}</td>
                      <td
                        style={
                          !(Math.sign(holding.capital_gains) === -1)
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {dollarFormat.format(holding.capital_gains)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link to="/trade">
              <Button
                className="manage-button mt-1"
                // onClick={() => {
                //   navigate("/trade");
                //   window.location.reload();
                // }}
              >
                Manage Current Holdings
              </Button>
            </Link>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default HoldingsTable;
