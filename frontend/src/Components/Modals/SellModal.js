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

const SellModal = (props) => {
  const [sharesAvailable, setSharesAvailable] = useState(true);



  let dollarFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });


  const totalSaleCalculation = () => {
    let calculatedPrice = 0
   
    if (props.sharesToSell > 0) {
      calculatedPrice = props.latestPrice * props.sharesToSell;
      return dollarFormat.format(calculatedPrice);
    } else {
      return dollarFormat.format(calculatedPrice)
    }
  };


  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <ModalHeader closeButton>
        <ModalTitle>
          <img className="modal-logo-size" src={testLogo}></img>{" "}
          {props.companyName}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="body-text">
        <div className="d-flex justify-content-between align-items-center align-self-center">
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

          <div className="right">
            <p className="">Account Balance:</p>
            <p className="numbers-font">{props.userCashBalance}</p>
          </div>
        </div>

        {/* <input placeholder="Number of Shares to Sell" type="number" className=></input> */}
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
              // setSharesToSell(value);
              // console.log(props.sharesToSell)
              // console.log(sharesAvailable)
       
              if (value > props.userShares) {
                setSharesAvailable(false);
                
                // console.log("value is greater than shares owned");
              } else if (value <= props.userShares) {
                setSharesAvailable(true);
                
              }
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
              <p className="calculation-padding p-2">Total Sale Amount:</p>
              <p className="total-calculation">{totalSaleCalculation()}</p>
            </div>

        {(props.userShares < props.sharesToSell || props.userShares === 0) ? (
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
              setSharesAvailable(true);
              props.setSharesToSell(0)

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
