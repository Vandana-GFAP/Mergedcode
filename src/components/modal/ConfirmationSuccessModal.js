import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon, successIcon } from '../../assets/images';
import './style.css';
import { getLanguageText } from "../../language";
import { useSelector } from "react-redux";

const ConfirmationSuccessModal = props => {
  const { modalToggle, setModalToggle,messageText='saveMessage' } = props;
  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const UserData = useSelector((state) => state.UserData) || {};

  const { language } = UserData || {}; 

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  return (
    <>
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
                <img src={successIcon} className="confirmation_img" alt="Success Icon" />
                <p className='confirmation_text'>{getLanguageText({ language, key: messageText })}</p>
            </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default ConfirmationSuccessModal;
