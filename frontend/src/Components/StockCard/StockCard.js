import React from "react";
import Fade from "react-reveal/Fade";
import { useState } from "react";
import "./StockCard.css";
import Tilty from "react-tilty";
import { Button } from "react-bootstrap";
import BuyModal from "../Modals/BuyModal";
import SellModal from "../Modals/SellModal";

const StockCard = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const handleShowBuy = () => setShowBuyModal(true);
  const handleShowSell = () => setShowSellModal(true);

  return (
    <Tilty scale={1.02} max="0" easing="cubic-bezier(.03,.98,.52,.99)">
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <Fade bottom duration={1000} delay={100} distance="30px">
              <div className="container">
                <div id="stock-card" className="d-flex justify-content-center">
                  <div className="card">
                    <div className="text-center pt-3">
                      {/* <img
                      src={logo}
                      className="penguin-logo-signin"
                      alt="penguin-logo"
                    ></img> */}
                    </div>
                    <div className="title-spacing">
                      <h3>Apple Inc.</h3>
                    </div>
                    <div class="card-body">
                      <div className="card-text mb-4">Share Price: $109.22</div>
                      <div className="card-text mb-4">Current Shares: 5</div>
                      <div className="card-text mb-4">
                        Value of Shares: $546.10
                      </div>
                    </div>
                    <div className="mb-2">
                      <Button className="vd-button">View Details</Button>
                    </div>
                    <div>
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
                    </div>
                    <div>
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
