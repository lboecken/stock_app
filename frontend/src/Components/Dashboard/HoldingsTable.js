import React from "react";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

const HoldingsTable = () => {
  return (
    <div className="">
      <Fade bottom duration={1000} delay={100} distance="30px">
        Current Holdings
        <table className="table=responsive table bg-light text-dark table-hover ">
          <thead className="thead-color">
            <tr>
              <th>Company</th>
              <th>Current Shares</th>
              <th>Current Price</th>
              <th>Value of Shares</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* {data.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.shares}</td>
                <td>{data.price}</td>
                <td>{data.value}</td>
              </tr>
            ))} */}

            <tr>
              <td>Netflix (NFLX)</td>
              <td>5</td>
              <td>$198.61</td>
              <td>$993.05</td>
              {/* <td> <Button className='details-button'>View Details</Button></td> */}
            </tr>
            <tr>
              <td>Apple (AAPL)</td>
              <td>2</td>
              <td>$148.71</td>
              <td>$297.42</td>
              {/* <td> <Button className='details-button'>View Details</Button></td> */}
            </tr>
          </tbody>
        </table>

            <Link to="/trade">
        <Button
          className="manage-button"
    
        >
          Manage Current Holdings
        </Button>
        </Link>
      </Fade>
    </div>
  );
};

export default HoldingsTable;
