import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const SellModal = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <ModalHeader closeButton>
        <ModalTitle>Company Name</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Modal Text</p>
      </ModalBody>
      <ModalFooter>
        <Button className="modal_btn mx-auto" onClick={props.onHide}>
          Sell Shares
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SellModal;
