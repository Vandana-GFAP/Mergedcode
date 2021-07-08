import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon, errorIcon } from '../../../assets/images';
import { getLanguageText } from '../../../language';
import useAppLanguage from "../../../hooks/useAppLanguage";
import '../style.css';

const ErrorModal = ({ modalToggle, setModalToggle }) => {
  const [language] = useAppLanguage();

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  // const onConfirm = () => {
  //   //TODO: API call to set error
  //   try {
  //     const updatedUserData = {
  //       ...userData,
  //     }; //* Received from backend
  //     //* Received from backend
  //     setModalToggle(false);
  //     store.dispatch(actions.setUserData({ ...updatedUserData }));
  //   } catch (err) {
  //     setModalToggle(true);
  //     console.log('<<< Error occured >>>\n', err);
  //   }
  // };

  return (
    <Modal
      isOpen={modalToggle}
      centered={true}
      toggle={modalToggleFunc}
      contentClassName='customStyle'
    >
      <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
        <p className='change_text'>{getLanguageText({ language, key: 'errorMsg' })}</p>
      </ModalHeader>

      <ModalBody>
        <div className='d-flex align-items-center flex-column'>
          <div>
            <p className='confirm_texxt'>{getLanguageText({ language, key: 'message' })}</p>
            <div>
              <img src={errorIcon} />
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default ErrorModal;