import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { closeIcon, successIcon } from "../../../assets/images";
import "../style.css";

const ConfirmationSuccessModal = ({ modalToggle, setModalToggle }) => {
  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  return (
    <Modal
      isOpen={modalToggle}
      centered={true}
      toggle={modalToggleFunc}
      contentClassName='customStyle'
    >
      <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
        <p className='change_text'>Confirmation</p>
      </ModalHeader>

      <ModalBody>
        <div className='d-flex align-items-center flex-column'>
          <p className='confirmation_text'>Success</p>
          <div>
            <img src={successIcon} />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default ConfirmationSuccessModal;