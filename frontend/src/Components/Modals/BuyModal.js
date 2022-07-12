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

const BuyModal = (props) => {
  // console.log(props.latestPrice, props.companyName)

  const [cashAvailable, setCashAvailable] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  let dollarFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalPurchaseCalculation = () => {
    if (props.sharesToBuy > 0) {
      setCalculatedPrice(props.latestPrice * props.sharesToBuy);
    } else {
      setCalculatedPrice(0);
    }
  };

  useEffect(() => {
    if (props.userCashBalance < calculatedPrice) {
      setCashAvailable(false);
    } else if (props.userCashBalance >= calculatedPrice) {
      setCashAvailable(true);
    }
    totalPurchaseCalculation();
  }, [ props.sharesToBuy, calculatedPrice]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <ModalHeader closeButton>
        <ModalTitle>
          {" "}
          <img className="modal-logo-size" src={testLogo}></img>{" "}
          {props.companyName}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="body-text">
        <div className="d-flex justify-content-between align-items-center align-self-center">
          <div className="left">
            <p className="">Current Share Price:</p>
            <p className="numbers-font">
              {dollarFormat.format(props.latestPrice)}
            </p>
          </div>
          <div className="numbers-margins justify-content-center align-items-center align-self-center">
            <p className="">Number of Shares Owned:</p>
            <p className="numbers-font">0</p>
          </div>

          <div className="right">
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
                type={"real"}
                precision={2}
                max={100}
                min={0}
                step={1}
                value={0}
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
              setCashAvailable(true);
              props.setSharesToBuy(0);
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
