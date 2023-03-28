import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function NotiModal(props) {
  return (
    <>
      <Modal show={props.show} backdrop="static" keyboard={false}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>{props.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.noti}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotiModal;
