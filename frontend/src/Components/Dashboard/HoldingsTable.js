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
     console.log("current")
     setLoading(false)
    } else {
      isMounted.current = true;
    }
  }, [userHoldings]);


  console.log(userHoldings.holdings);

  let navigate = useNavigate();

  return (
    
    <div className="mx-auto">
      {loading ? (
        <div>
          <h6 className="text-center">Loading Holdings Data...</h6>

          <Spinner />
        </div>
      ) : (
      
      <Fade bottom duration={1000} delay={100} distance="30px">
        <p>Current Holdings</p>
        <div className="table-responsive-md">
          <table className=" table w-75 bg-light text-dark table-hover mx-auto">
            <thead className="thead-color">
              <tr>
                <th>Company</th>
                <th>Current Shares</th>
                <th>Current Price</th>
                <th>Cost Basis</th>
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
                  <td>{dollarFormat.format(holding.total_cost_basis)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/trade">
          <Button
            className="manage-button"
            // onClick={() => {
            //   navigate("/trade");
            //   window.location.reload();
            // }}
          >
            Manage Current Holdings
          </Button>
        </Link>
      </Fade>
      )}

    </div>
  );
};

export default HoldingsTable;

/* <tr>
<td>Netflix (NFLX)</td>
<td>5</td>
<td>$198.61</td>
<td>$993.05</td>
<td> <Button className='details-button'>View Details</Button></td>
</tr>
<tr>
<td>Apple (AAPL)</td>
<td>2</td>
<td>$148.71</td>
<td>$297.42</td>
<td> <Button className='details-button'>View Details</Button></td>
</tr> */
