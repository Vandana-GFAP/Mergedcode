import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { closeIcon } from "../../../assets/images";
import CustomButtom from "../../button";
import GetMPinModal from "./GetMPinModal";
import { getLanguageText } from '../../../language';
import useAppLanguage from "../../../hooks/useAppLanguage";
import "../style.css";

const MPinModal = (props) => {
  const { modalToggle, setModalToggle, showCard = () => { } } = props;
  const [language] = useAppLanguage();

  const [resetMpinModal, setResetMpinModal] = useState(false);

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  const [mpin, setMpin] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = () => {
    if (mpin?.length != 6) {
      setError(true);
      return;
    }

    //TODO: API call to verify the m-pin
    try {
      const responce = true;
      if (responce) {
        showCard(true);
        setModalToggle(false);
      }
    } catch (err) {
      setError(true);
      console.log('<<< Error in verifying m-Pin >>>\n', err);
    }
  };

  const resetMPin = () => {
    console.log('Reset...');
    setModalToggle(false);
    setResetMpinModal(true);
  };

  return (
    <>
      <Modal
        isOpen={modalToggle}
        centered={true}
        toggle={modalToggleFunc}
        contentClassName='customStyle'
      >
        <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
          <p className='change_text'>
            {getLanguageText({ language, key: 'mPinModal' })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className='d-flex flex-column align-items-center'>
            <input
              className='input_fields'
              type='number'
              placeholder={getLanguageText({ language, key: 'enterMpin' })}
              value={mpin}
              onChange={event => {
                if (event.target.value.length <= 6) setMpin(event.target.value);
              }}
              onFocus={() => setError(false)}
            />

            <div className='forgot_sections'>
              <p className='forGot_txt'>
                {getLanguageText({ language, key: 'forgotMPIn' })}
              </p>
              <p className='forGot_link' onClick={() => resetMPin()}>
                {getLanguageText({ language, key: 'resetMPIn' })}
              </p>
            </div>

            {error && (
              <p className='error_validate'>
                {getLanguageText({ language, key: 'errorMPin' })}
              </p>
            )}

            <div className='btn_section'>
              <CustomButtom
                label={getLanguageText({ language, key: 'submit' })}
                onClick={onSubmit}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
      {
        resetMpinModal &&
        <GetMPinModal
          modalToggle={resetMpinModal}
          setModalToggle={setResetMpinModal}
        />
      }
    </>
  );
};

export default MPinModal;
