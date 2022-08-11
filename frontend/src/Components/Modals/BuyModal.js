import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputSpinner from "react-bootstrap-input-spinner";
import { useState, useEffect } from "react";
import "./Modals.css";
import testLogo from "../../Images/test-logo.png";
import axios from "axios";
import { truncateModals, dollarFormat } from "../Handlers";

const BuyModal = (props) => {
  const [cashAvailable, setCashAvailable] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState(0);


  useEffect(() => {
   
    if (props.userCashBalance < calculatedPrice) {
      setCashAvailable(false);
    } else if (props.userCashBalance >= calculatedPrice) {
      setCashAvailable(true);
    }
    totalPurchaseCalculation();
  }, [props.sharesToBuy, calculatedPrice]);



  const createTransaction = () => {
    const transactionData = {
      user_id: props.userId,
      username: props.signedInUser,
      company_name: props.companyName,
      company_symbol: props.stockSymbol,
      shares: props.sharesToBuy,
      cost_basis: props.latestPrice.toFixed(2),
      transaction_type: props.transactionType,
      transaction_total: calculatedPrice.toFixed(2)
    };
    if (props.sharesToBuy > 0) {

    axios
      .post("/api/transactions", transactionData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  };
}

  const createHoldingRecord = () => {
    const HoldingsData = {
      user_id: props.userId,
      username: props.signedInUser,
      company_name: props.companyName,
      company_symbol: props.stockSymbol,
      current_shares: props.sharesToBuy,
      total_cost_basis: calculatedPrice.toFixed(2),
      transaction_type: props.transactionType
    };
    if (props.sharesToBuy > 0) {

    axios
      .post("/api/holdings", HoldingsData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  };

  }


  const totalPurchaseCalculation = () => {
    if (props.sharesToBuy > 0) {
      setCalculatedPrice(props.latestPrice * props.sharesToBuy);
    } else {
      setCalculatedPrice(0);
    }
  };



  return (
    <Modal
      {...props}
      // aria-labelledby="contained-modal-title-vcenter"
      
      centered
      size="lg"
    >
      <ModalHeader className="d-flex flex-lg-row flex-column justify-content-between align-items-center align-self-center" closeButton>
          
        <ModalTitle className="mx-auto">
          
       <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center align-self-center">
          <div className="title-margins"><img className="modal-logo-size" src={props.stockLogo}></img></div> 
         
          <div className="justify-content-center align-items-center align-self-center">{truncateModals(props.companyName)}</div>
          <div className="">{props.stockSymbol}</div> 
          </div>
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="body-text">
        <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center align-self-center">
          <div className="left">
            <p className="">Current Share Price:</p>
            <p className="numbers-font">
              {dollarFormat.format(props.latestPrice)}
            </p>
          </div>
          <div className="numbers-margins justify-content-center align-items-center align-self-center">
            <p className="">Number of Shares Owned:</p>
            <p className="numbers-font">{props.userShares}</p>
          </div>

          <div className="right justify-content-end">
            <p className="">Account Balance:</p>
            <p className="numbers-font">
              {dollarFormat.format(props.userCashBalance)}
            </p>
          </div>
        </div>

        {/* <input placeholder="Number of Shares to Buy" type="number" className=></input> */}
        <div className="d-flex justify-content-center align-items-center align-self-center">
          <div className="mx-auto">
            <p>Number of Shares to Buy:</p>
            <div id="spinner" className="mt-3">
              <InputSpinner
                // editable={false}
                type={"int"}
                precision={2}
                max={100}
                min={0}
                step={1}
                value={0}
                size="lg"
                onChange={(value) => {
                  props.setSharesToBuy(value);
                  // console.log(props.sharesToBuy);
                  // console.log(cashAvailable);
                }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <p className="calculation-padding p-2">Total Purchase Amount:</p>
              <p className="total-calculation">
                {dollarFormat.format(calculatedPrice)}
              </p>
            </div>
          </div>
        </div>
        {props.userCashBalance < calculatedPrice ? (
          <p className="no-funds">
            You do not have enough cash to complete this transaction.
          </p>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button
          className="modal_btn mx-auto"
          onClick={() => {
            if (!cashAvailable) {
              console.log(
                "You do not have enough funds to complete the transaction."
              );
              setCashAvailable(false);
            } else {
              props.onHide();
              console.log("Funds are available");
              createTransaction();
              createHoldingRecord();
              setCashAvailable(true);
              props.setSharesToBuy(0);
              window.location.reload()
            }
          }}
        >
          Buy Shares
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BuyModal;
