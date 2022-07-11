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
  const [sharesToSell, setSharesToSell] = useState(0)
  const [resetShares, setResetShares] = useState(false)

  let sharesOwned = 3;


  // const checkShares = () => {
  //   if (sharesOwned > 0 && !(sharesOwned < sharesToSell)) {
  //     setSharesAvailable(true);
  //   }
    
  // };

  // const checkReset = () => {
  //   if (props.onHide) {
  //     setResetShares(true)
  //   } else {
  //     setResetShares(false)
  //   }
  // }
  // useEffect(() => {
  //   checkShares();
  //   checkReset();
  // }, [sharesToSell, resetShares]);

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
              {props.latestPrice}
            </p>
          </div>
          <div className="numbers-margins justify-content-center align-items-center align-self-center">
            <p className="">Number of Shares Owned:</p>
            <p className="numbers-font">{sharesOwned}</p>
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
            type={"real"}
            precision={2}
            max={100}
            min={0}
            step={1}
            value={0}
            onChange={(value) => {
              setSharesToSell(value);
              console.log(sharesToSell)
              console.log(props.resetSharesToSell)
       
              if (value > sharesOwned) {
                setSharesAvailable(false);
                // console.log("value is greater than shares owned");
              } else if (value <= sharesOwned) {
                setSharesAvailable(true);
              }
            }}
          />
        </div>

        {(sharesOwned < sharesToSell || sharesOwned === 0) || props.resetSharesToSell === 0 ? (
          <p className="no-shares">
            You do not have enough shares to complete the transaction.
          </p>
        ) : null}
      </ModalBody>
      <ModalFooter>
        <Button
          className="modal_btn mx-auto"
          onClick={() => {
           
            if (!sharesAvailable || sharesOwned === 0) {
              console.log(
                "You do not have enough shares to complete the transaction."
              );
              setSharesAvailable(false);
              // console.log(sharesAvailable);
            } else {
              props.onHide();
              console.log("Shares are available");
              setSharesAvailable(true);
              
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
