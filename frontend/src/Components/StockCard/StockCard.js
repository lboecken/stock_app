import React from "react";
import Fade from "react-reveal/Fade";
import { useState, useEffect, useRef } from "react";
import "./StockCard.css";
import Tilty from "react-tilty";
import { Button } from "react-bootstrap";
import { truncate, dollarFormat } from "../Handlers";

const StockCard = ({
  companyName,
  companySymbol,
  currentShares,
  currentPrice,
  totalCostBasis,
  runSearch,
  onSearch,
}) => {
  const isMounted = useRef(false);
  const [dismount, setDismount] = useState(false);

  useEffect(() => {
    if (isMounted.current) {
      runSearch();
    } else {
      isMounted.current = true;
    }
  }, [dismount]);

  return (
    <Tilty scale={1.02} max="0" easing="cubic-bezier(.03,.98,.52,.99)">
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <Fade bottom duration={1000} delay={100} distance="30px">
              <div className="container">
                <div id="stock-card" className="d-flex justify-content-center">
                  <div className="card">
                    {/* <div className="text-center"></div> */}
                    <div className="card-header" >
                      <h4>{companySymbol}</h4>
                      <h7>{truncate(companyName)}</h7>
                    </div>
                    <div class="card-body">
                      <div className="card-text mt-2 mb-4">
                        Current Price: {dollarFormat.format(currentPrice)}
                      </div>
                      <div className="card-text mb-4">
                        Current Shares: {currentShares}
                      </div>
                      <div className="card-text mb-4">
                        Total Cost Basis: {dollarFormat.format(totalCostBasis)}
                      </div>
                      <div>
                        <Button
                          className="vd-button mb-2 mt-2"
                          onClick={() => {
                            onSearch(companySymbol);
                            setDismount(!dismount);
                            // getHoldingsData()
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </Tilty>
  );
};

export default StockCard;
