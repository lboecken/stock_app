import React from 'react'
import { useEffect, useState } from "react";
import { Button, Modal} from 'react-bootstrap';
import "../Dashboard/Dashboard.css"
import "../Dashboard/Dashboard"
import BuyModal from '../Modals/BuyModal';
import SellModal from '../Modals/SellModal';
import DashboardNavBar from '../Dashboard/DashboardNavbar';
import "../TradePage/TradePage.css"
import StockCard from '../StockCard/StockCard';

const TradePage = () => {

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const handleShowBuy = () => setShowBuyModal(true);
  const handleShowSell = () => setShowSellModal(true);

  return (

    <div className='body-font'>
    
    <DashboardNavBar />
    
    Trade Page
<div id="stock-input">
    
    <input  type="text" placeholder='Search Stocks'></input>

    <Button className='search-button'>Search</Button>


</div>

    <div>
    <StockCard />

    <Button className='mb-2 button-colors' onClick={handleShowBuy}>Buy Shares</Button>
   
   <BuyModal show={showBuyModal} onHide={() => setShowBuyModal(false)} />

    </div>
  <div>

   <Button className='mb-2 button-colors' onClick={handleShowSell}>Sell Shares</Button>
   <SellModal show={showSellModal} onHide={() => setShowSellModal(false)} />

  </div>

    </div>
  )
}

export default TradePage