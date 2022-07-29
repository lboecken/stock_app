import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Dashboard/Dashboard.css";
import "../Dashboard/Dashboard";
import BuyModal from "../Modals/BuyModal";
import SellModal from "../Modals/SellModal";
import DashboardNavBar from "../Dashboard/DashboardNavbar";
import "../TradePage/TradePage.css";
import HoldingsList from "../HoldingsList";
import axios from "axios";
import Chart from "../Charts";
import { DateTime } from "luxon";
import Fade from "react-reveal/Fade";
import testLogo from "../../Images/test-logo.png";
import useUser from "../useUser";
import { truncate } from "../Handlers";
import Spinner from "../Spinner";

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
  const [isData, setIsData] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { signedInUser, signOutUser } = useUser();
  const [userId, setUserId] = useState("");
  const [userCashBalance, setUserCashBalance] = useState("");
  const [sharesToSell, setSharesToSell] = useState(0);
  const [sharesToBuy, setSharesToBuy] = useState(0);
  const [userShares, setUserShares] = useState(0);
  const [transactionType, setTransactionType] = useState("");
  const [userHoldings, setUserHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getAllStocks();
  //   // console.log(data)
  // }, [searchValue]);

  useEffect(() => {
    getAllStocks();
    getUsers();
    getHoldingsData();
    // getHoldingsData()
    // console.log(data)
  }, []);
  // }, [console.log(isData), renderedData]);

  async function getStockDetails() {
    await axios.get("api/details/" + stockSymbol).then((res) => {
      if (res.data === "Something Went Wrong") {
        setIsData(false);
        // console.log("Stock Details Has No Data...");
      } else {
        setStockDetails(res.data);
        setIsData(true);
      }
    });
  }

  async function getStockLogo() {
    await axios.get("api/logo/" + stockLogo).then((res) => {
      if (res.data === "Something Went Wrong") {
        setIsData(false);
      } else {
        setStockLogo(res.data);
        setIsData(true);
      }
      // console.log(res.data);
    });
  }

  async function getLastWeekClosingPrices() {
    await axios.get("api/lastweek/" + stockSymbol).then((res) => {
      if (res.data === "Something Went Wrong") {
        setIsData(false);
      } else {
        setLastWeekClosingPrices(res.data);
        setIsData(true);
      }
      // console.log(res.data);
    });
  }

  async function getAllStocks() {
    await axios.get("api/allstocks").then((res) => {
      if (res.data === "Something Went Wrong") {
        // setIsData(false);
        console.log("All Stocks Has No Data...");
      } else {
        setAllStocks(res.data);
        setIsData(true);
        console.log("All Stocks Has Data!");
      }
      // console.log(res.data);
    });
  }

  async function getUsers() {
    await axios.get("api/users/" + signedInUser).then((res) => {
      console.log(res.data);
      // console.log(res.data[0].id)
      setUserId(res.data[0].id);
    });
  }

  async function getCashBalance() {
    await axios.get("api/cash_balance/" + signedInUser).then((res) => {
      // console.log(res.data[0].cash_balance);
      setUserCashBalance(Number(res.data[0].cash_balance));
      // console.log(signedInUser);
    });
  }

  async function getHoldingsData() {
    await axios.get("api/holdings/" + signedInUser).then((res) => {
      
      setUserHoldings(res.data);

      console.log(res.data);
    });
  }

  const getuserShares = () => {
    userHoldings.holdings.map((company) => {
      if (company.company_symbol === stockSymbol.toUpperCase()) {
        setUserShares(company.current_shares);
      }
    });
  };

  const runSearch = () => {
    getStockDetails();
    getStockLogo();
    getLastWeekClosingPrices();
  };

  const data = stockDetails?.map((stock) => {
    const finalClosePrices = lastweekClosingPrices.map((closings) => {
      return closings;
    });
    return {
      ...stock,
      companyName: stock?.companyName,
      latestPrice: stock?.latestPrice,
      priceChange: stock?.priceChange,
      symbol: stock?.symbol,
      logo: stockLogo?.url,
      lastWeekClosingPrices: finalClosePrices,
    };
  });

  const convertDate = (date) => {
    const day = DateTime.fromISO(date).toFormat("d");
    const month = DateTime.fromISO(date).toFormat("MMM");

    return `${month} ${day}`;
  };

  let stock_data = [["Date", "Closing Price"]];

  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    setStockSymbol(searchTerm);
    setStockLogo(searchTerm);
  };


  const focusInput = () => {
    const selectInput = document.getElementById("input");
    selectInput.focus();
  };

  const renderedData = data.map((stock) => {
    // console.log(stock);

    stock.lastWeekClosingPrices.map((price) => {
      stock_data.push([convertDate(price.date), price.closePrice]);
    });

    return (
      <div>
        <img src={stock.logo}></img>
        <p>${stock.priceChange}</p>
      </div>
    );
  });

  return (
    <div className="body-font">
      <DashboardNavBar />

      <div id="stock-input" className="mb-3">
        <input
          id="input"
          type="text"
          value={searchValue}
          placeholder="Search Stocks"
          onChange={(e) => {
            setSearchValue(e.target.value);
            setStockSymbol(e.target.value);
            setStockLogo(e.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key == "Enter" && searchValue !== "") {
              // getStockDetails();
              // getStockLogo();
              // getLastWeekClosingPrices();
              runSearch();
              onSearch(searchValue);
            }
          }}
          autoFocus="True"
        ></input>

        <Button
          id="search-button"
          className="search-button"
          onClick={() => {
            if (searchValue !== "") {
              // runSearch(searchValue);
              runSearch();
              onSearch(searchValue);
            }
          }}
        >
          Search
        </Button>
      </div>
      <div className="dropdown mx-auto">
        {allStocks
          ?.filter((stock) => {
            const searchTerm = searchValue.toLowerCase();

            const fullCompanyName = stock.companyName.toLowerCase();

            const fullSymbol = stock.symbol.toLowerCase();

            const fullDetails = stock.fullDetails.toLowerCase();

            return (
              searchTerm &&
              /* fullDetails.includes("(" + searchTerm + ")") && */
              /* fullDetails.includes(searchTerm) && */
              /* fullSymbol.startsWith("(" + searchTerm + ")") &&  */
              fullSymbol.startsWith(searchTerm) &&
              searchTerm !== fullSymbol
            );
            {
              /* ||
                fullCompanyName.startsWith(searchTerm) ||
                fullSymbol.startsWith(searchTerm)) 
                && fullDetails !== searchTerm 
                  ||
                  fullSymbol !== searchTerm ||
                  fullCompanyName !== searchTerm */
            }
          })
          .slice(0, 10)
          .map((stock) => (
            <div
              className="dropdown-row"
              onClick={() => {
                onSearch(stock.symbol);
                focusInput();
              }}
              key={stock.symbol}
            >
              {stock.fullDetails}
              {/* {console.log(stock)} */}
            </div>
          ))}
      </div>
      <p></p>
      {isData ? (
        ""
      ) : (
        <p>Company Not Found. Please try searching for another.</p>
      )}
      {stockDetails.length === 0 ? (
        ""
      ) : (
        <div id="details" className="">
          <Fade top duration={1000} delay={100} distance="30px">
            <div className="mt-2 mb-3 mx-auto justify-content-center">
              <div id="inner-card" className="mb-3">
                <Chart
                  stock_data={stock_data}
                  companyName={data[0]?.companyName}
                  priceChange={data[0]?.priceChange}
                  latestPrice={data[0]?.latestPrice}
                  companySymbol={data[0]?.symbol}
                />
                <div className="d-flex justify-content-center mt-3">
                  <div className="stock-button-spacing">
                    <Button
                      className="button-colors"
                      onClick={() => {
                        handleShowBuy();
                        getCashBalance();
                        getuserShares();
                        setTransactionType("Buy");
                      }}
                    >
                      Buy Shares
                    </Button>

                    <BuyModal
                      value="Buy"
                      latestPrice={data[0]?.latestPrice}
                      companyName={data[0]?.companyName}
                      stockSymbol={data[0]?.symbol}
                      userCashBalance={userCashBalance}
                      setSharesToBuy={setSharesToBuy}
                      sharesToBuy={sharesToBuy}
                      show={showBuyModal}
                      userId={userId}
                      signedInUser={signedInUser}
                      userHoldings={userHoldings}
                      userShares={userShares}
                      transactionType={transactionType}
                      onHide={() => {
                        setShowBuyModal(false);
                        setSharesToBuy(0);
                        setUserShares(0);
                      }}
                    />
                  </div>

                  <div>
                    <Button
                      className="button-colors"
                      onClick={() => {
                        handleShowSell();
                        getCashBalance();
                        getuserShares();
                        setTransactionType("Sell");
                      }}
                    >
                      Sell Shares
                    </Button>
                    <SellModal
                      latestPrice={data[0]?.latestPrice}
                      companyName={data[0]?.companyName}
                      stockSymbol={data[0]?.symbol}
                      userCashBalance={userCashBalance}
                      userId={userId}
                      show={showSellModal}
                      setSharesToSell={setSharesToSell}
                      sharesToSell={sharesToSell}
                      userShares={userShares}
                      transactionType={transactionType}
                      onHide={() => {
                        setShowSellModal(false);
                        setSharesToSell(0);
                        setUserShares(0);
                        // console.log("modal hidden")
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      )}
      {loading ? (
        <div>
          <h6 className="text-center">Loading Holdings Data...</h6>

          <Spinner />
        </div>
      ) : (
        ""
      )}

      <div>
        <HoldingsList
          setStockSymbol={setStockSymbol}
          stockSymbol={stockSymbol}
          userHoldings={userHoldings}
          runSearch={runSearch}
          onSearch={onSearch}
          getHoldingsData={getHoldingsData}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default TradePage;
