import React from "react";
import Fade from "react-reveal/Fade";
import { useState, useEffect, useRef } from "react";
import "./StockCard.css";
import Tilty from "react-tilty";
import { Button } from "react-bootstrap";
import { truncate } from "../Handlers"
import axios from "axios";

const StockCard = ({
  companyName,
  companySymbol,
  currentShares,
  totalCostBasis,
  runSearch,
  onSearch,
  getStockDetails,
  stockDetails,
  latestPrice
}) => {
  let dollarFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const isMounted = useRef(false);
  const [dismount, setDismount] = useState(false);
  const [latestPrices, setLatestPrices] = useState([0])

  useEffect(() => {
    
    if (isMounted.current) {
      runSearch();
    } else {
      isMounted.current = true;
    }
  }, [dismount]);

  useEffect(() => {
    getlatestPrice(companySymbol)
  
  },[companySymbol]);




  async function getlatestPrice(companySymbol) {
    await axios.get("api/details/" + companySymbol).then((res) => {
      if (res.data === "Something Went Wrong") {
        console.log("There is a problem")
        // console.log("Stock Details Has No Data...");
      } else {
        // console.log({companySymbol: res.data[0]?.symbol, latestPrice: res.data[0]?.latestPrice})
        setLatestPrices([{companySymbol: res.data[0]?.symbol, latestPrice: res.data[0]?.latestPrice}])
        
      }
    });
  }



  return (
    <Tilty scale={1.02} max="0" easing="cubic-bezier(.03,.98,.52,.99)">
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <Fade bottom duration={1000} delay={100} distance="30px">
              <div className="container">
                <div id="stock-card" className="d-flex justify-content-center">
                  <div className="card">
                    <div className="text-center"></div>
                    <div className="card-header">
                      <h4>{companySymbol}</h4>
                      <h7>{truncate(companyName)}</h7>
                    </div>
                    <div class="card-body">
                      <div className="card-text mb-4">
                        Current Share Price:  
                         {latestPrices.map((price) => {
                          if (price.companySymbol == companySymbol) {
                            return " " + dollarFormat.format(price.latestPrice)
                          } else {
                            return dollarFormat.format(0)
                          }
                        })}
                    
                      </div>
                      <div className="card-text mb-4">
                        Current Shares: {currentShares}
                      </div>
                      <div className="card-text mb-4">
                        Total Cost Basis: {dollarFormat.format(totalCostBasis)}
                      </div>
                      <div>
                        <Button
                          className="vd-button mb-2"
                          onClick={() => {
                            onSearch(companySymbol);
                            setDismount(!dismount);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                    {/* <div>
                      <Button
                        className="mb-2 button-colors"
                        onClick={handleShowBuy}
                      >
                        Buy Shares
                      </Button>

                      <BuyModal
                        show={showBuyModal}
                        onHide={() => setShowBuyModal(false)}
                      />
                    </div> */}
                    {/* <div>
                      <Button
                        className="mb-4 button-colors"
                        onClick={handleShowSell}
                      >
                        Sell Shares
                      </Button>
                      <SellModal
                        show={showSellModal}
                        onHide={() => setShowSellModal(false)}
                      />
                    </div> */}
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
