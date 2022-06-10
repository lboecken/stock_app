import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { useState } from "react";
import "./Modals.css";

const BuyModal = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <ModalHeader closeButton>
        <ModalTitle>Apple Inc.</ModalTitle>
      </ModalHeader>
      <ModalBody className=" body-text">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="">Current Share Price</p>
            <p className="justify-content-center numbers-font">$109.22</p>
          </div>
          <div className="">
            <p className="">Current Number of Shares</p>
            <p className="numbers-font">5</p>
          </div>

          <div>
            <p className="">Current Account Balance</p>
            <p className="numbers-font">$100,000</p>
          </div>
        </div>

        {/* <input placeholder="Number of Shares to Buy" type="number" className=></input> */}
       <div>
       Number of Shares to Buy: 
       </div> 
        <div className="number-input">


        <NumericInput
          className="number-input"
          placeholder={0}
          min={0}
          max={2000}
          size={6}
        />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="modal_btn mx-auto" onClick={props.onHide}>
          Buy Shares
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BuyModal;
