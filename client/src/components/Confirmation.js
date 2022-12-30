import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Confimation</Modal.Title>
      </Modal.Header>
      <Modal.Body>[WIP] Detail reservasi</Modal.Body>
      <Modal.Footer>
        <Button id="cancel" variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Check Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
