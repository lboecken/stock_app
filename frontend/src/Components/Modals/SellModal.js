import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputSpinner from "react-bootstrap-input-spinner";
import "./Modals.css";
import testLogo from "../../Images/test-logo.png";
import { truncateModals, dollarFormat } from "../Handlers";
import axios from "axios";

const SellModal = (props) => {
  const [sharesAvailable, setSharesAvailable] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    totalSaleCalculation();
  }, [props.sharesToSell, calculatedPrice]);

  const createTransaction = () => {
    const transactionData = {
      user_id: props.userId,
      company_name: props.companyName,
      company_symbol: props.stockSymbol,
      shares: props.sharesToSell,
      cost_basis: props.latestPrice.toFixed(2),
      transaction_type: props.transactionType,
      transaction_total: calculatedPrice.toFixed(2),
    };
    if (props.sharesToSell > 0) {
      axios
        .post("/db/transactions", transactionData, {
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
    }
  };

  console.log()

  const createHoldingRecord = () => {
    const HoldingsData = {
      user_id: props.userId,
      username: props.signedInUser,
      company_name: props.companyName,
      company_symbol: props.stockSymbol,
      current_shares: props.sharesToSell,
      total_cost_basis: calculatedPrice.toFixed(2),
      transaction_type: props.transactionType,
    };
    if (props.sharesToSell > 0) {
      axios
        .post("/db/holdings", HoldingsData, {
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
    }
  };

  const totalSaleCalculation = () => {
    if (props.sharesToSell > 0) {
      setCalculatedPrice(props.latestPrice * props.sharesToSell);
      // return dollarFormat.format(calculatedPrice);
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
      <ModalHeader closeButton className="d-flex flex-lg-row flex-column justify-content-between align-items-center align-self-center">
        <ModalTitle className="mx-auto">
          <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center align-self-center">
            <div className="title-margins">
              <img className="modal-logo-size" src={props.stockLogo}></img>
            </div>

            <div className="justify-content-center align-items-center align-self-center">
              {truncateModals(props.companyName)}
            </div>
            <div className="">{props.stockSymbol}</div>
          </div>
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="body-text">
        <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center align-self-center">
          <div className="left">
            <p className="">Current Share Price:</p>
            <p className="justify-content-center numbers-font">
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

        <div>Number of Shares to Sell:</div>
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
              props.setSharesToSell(value);
              

              if (value > props.userShares) {
                setSharesAvailable(false);

               
              } else if (value <= props.userShares) {
                setSharesAvailable(true);
              }
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <p className="calculation-padding p-2">Total Sale Amount:</p>
          <p className="total-calculation">
            {dollarFormat.format(calculatedPrice)}
          </p>
        </div>

        {props.userShares < props.sharesToSell || props.userShares === 0 ? (
          <p className="no-shares">
            You do not have enough shares to complete this transaction.
          </p>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button
          className="modal_btn mx-auto"
          onClick={() => {
            if (!sharesAvailable || props.userShares === 0) {
              console.log(
                "You do not have enough shares to complete the transaction."
              );
              setSharesAvailable(false);
              // console.log(sharesAvailable);
            } else {
              props.onHide();
              console.log("Shares are available");
              createTransaction();
              createHoldingRecord();
              setSharesAvailable(true);
              props.setSharesToSell(0);
              window.location.reload()
            }
          }}
        >
          Sell Shares
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SellModal;
