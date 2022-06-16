import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Dashboard/Dashboard.css";
import "../Dashboard/Dashboard";
import BuyModal from "../Modals/BuyModal";
import SellModal from "../Modals/SellModal";
import DashboardNavBar from "../Dashboard/DashboardNavbar";
import "../TradePage/TradePage.css";
import StockCard from "../StockCard/StockCard";
import axios from "axios";

const TradePage = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const handleShowBuy = () => setShowBuyModal(true);
  const handleShowSell = () => setShowSellModal(true);
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockDetails, setStockDetails] = useState([]);
  const [stockLogo, setStockLogo] = useState([]);
  const [lastweekClosingPrices, setLastWeekClosingPrices] = useState([]);
  const [allStocks, setAllStocks] = useState([]);

  
  async function getStockDetails() {
    await axios.get("api/details/" + stockSymbol).then((res) => {
      setStockDetails(res.data);
      // console.log(res.data);
    });
  }

  async function getStockLogo() {
    await axios.get("api/logo/" + stockLogo).then((res) => {
      setStockLogo(res.data);
      // console.log(res.data);
    });
  }

  async function getLastWeekClosingPrices() {
    await axios.get("api/lastweek/" + stockSymbol).then((res) => {
      setLastWeekClosingPrices(res.data);
      // console.log(res.data);
    });
  }

  async function getAllStocks() {
    await axios.get("api/allstocks").then((res) => {
      setAllStocks(res.data);
      // console.log(res.data);
    });
  }

  useEffect(() => {
    getAllStocks()
    
  }, []);



  const data = stockDetails?.map((stock) => {
  
    return {
      ...stock,
      companyName: stock.companyName,
      latestPrice: stock.latestPrice,
      priceChange: stock.priceChange,
      symbol: stock.symbol,
      logo: stockLogo.url,
      lastWeekClosingPrices: lastweekClosingPrices
    }
  })

  console.log(data)

  return (
    <div className="body-font">
      <DashboardNavBar />
      Trade Page
      <div id="stock-input">
        <input
          type="text"
          placeholder="Search Stocks"
          onChange={(e) => {
            setStockSymbol(e.target.value);
            setStockLogo(e.target.value);
          }}
          onKeyUp={(event) => {
                if (event.key == "Enter") {
                  getStockDetails();
                  getStockLogo();
                  getLastWeekClosingPrices();
                }
              }}
              autoFocus="True"
        ></input>

        <Button
          className="search-button"
          onClick={() => {
            getStockDetails();
            getStockLogo();
            getLastWeekClosingPrices();
          }}
        >
          Search
        </Button>
      </div>
      <div>
        <StockCard />

        <Button className="mb-2 button-colors" onClick={handleShowBuy}>
          Buy Shares
        </Button>

        <BuyModal show={showBuyModal} onHide={() => setShowBuyModal(false)} />
      </div>
      <div>
        <Button className="mb-2 button-colors" onClick={handleShowSell}>
          Sell Shares
        </Button>
        <SellModal
          show={showSellModal}
          onHide={() => setShowSellModal(false)}
        />
      </div>
      {/* <img src={stockLogo.url}></img> */}
    </div>
  );
};

export default TradePage;
