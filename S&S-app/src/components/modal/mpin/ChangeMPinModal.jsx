import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";

import ConfirmationSuccessModal from '../output/ConfirmationSuccessModal';
import ErrorModal from '../output/ErrorModal';
import useUserMobileNumber from "../../../hooks/useUserMobileNumber";
import CustomButtom from "../../button";
import GetMPinModal from "./GetMPinModal";

import { closeIcon } from "../../../assets/images";
import { changeMPIN } from "../../../redux/actions/userData.action";
import { getLanguageText } from '../../../language';
import useAppLanguage from "../../../hooks/useAppLanguage";

import "../style.css";

const ChangeMPinModal = ({ modalToggle, setModalToggle }) => {
  const dispatch = useDispatch();
  const [language] = useAppLanguage();

  const [oldMpin, setOldMpin] = useState('');
  const [newMpin, setNewMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [resetMpinModal, setResetMpinModal] = useState(false);
  const [error, setError] = useState(false);
  const [mobileNumber] = useUserMobileNumber();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    setOldMpin('');
    setNewMpin('');
    setConfirmMpin('');

    setError(false);
  }, [modalToggle, setModalToggle]);

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  const resetMPin = () => {
    console.log('Reset...');
    setResetMpinModal(true);
    // setModalToggle(false);
  };

  const onSubmit = () => {
    if (
      oldMpin?.length != 6 ||
      newMpin?.length != 6 ||
      confirmMpin?.length != 6 ||
      newMpin != confirmMpin
    ) {
      setError(true);
      return;
    }

    dispatch(changeMPIN({ payload: { mobile: mobileNumber, mpin: oldMpin, newMPIN: newMpin } }))
      .then(() => {
        setModalToggle(false);
        setSuccess(true);
      })
      .catch(() => {
        setError(true);
        setFailure(true);
      });
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
            {getLanguageText({ language, key: 'changeMPIn' })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className='d-flex flex-column align-items-center'>
            <input
              className='input_fields'
              type='number'
              placeholder={getLanguageText({ language, key: 'oldMPIn' })}
              value={oldMpin}
              onChange={event => {
                if (event.target.value.length <= 6)
                  setOldMpin(event.target.value);
              }}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='number'
              placeholder={getLanguageText({ language, key: 'newMPIn' })}
              value={newMpin}
              onChange={event => {
                if (event.target.value.length <= 6)
                  setNewMpin(event.target.value);
              }}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='number'
              placeholder={getLanguageText({ language, key: 'confirmMPIn' })}
              value={confirmMpin}
              onChange={event => {
                if (event.target.value.length <= 6)
                  setConfirmMpin(event.target.value);
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

            <div className='note_section'>
              <p className='note-txt'>
                {getLanguageText({ language, key: 'note' })}
              </p>
              <p className='note-detail'>
                {getLanguageText({ language, key: 'changePasswordNote' })}
              </p>
            </div>

            {error && (
              <p className='error_validate'>
                {getLanguageText({ language, key: 'error' })}
              </p>
            )}

            <div className='btn_section'>
              <CustomButtom
                label={getLanguageText({ language, key: 'save' })}
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
          previousModalToggle={setModalToggle}
          previousScreenName="changeMPIN"
        />
      }
      {
        success &&
        <ConfirmationSuccessModal
          modalToggle={success}
          setModalToggle={setSuccess}
        />
      }
      {
        failure &&
        <ErrorModal
          modalToggle={failure}
          setModalToggle={setFailure}
        />
      }
    </>
  );
};

export default ChangeMPinModal;
