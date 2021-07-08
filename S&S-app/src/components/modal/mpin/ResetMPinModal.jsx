import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import CustomButtom from "../../button";
import ErrorModal from '../output/ErrorModal';
import ConfirmationSuccessModal from '../output/ConfirmationSuccessModal';
import useUserMobileNumber from "../../../hooks/useUserMobileNumber";
import useAppLanguage from "../../../hooks/useAppLanguage";

import { getLanguageText } from '../../../language';
import { resetMPIN } from '../../../redux/actions/userData.action';
import { closeIcon } from "../../../assets/images";
import "../style.css";

const ResetMPinModal = ({ modalToggle, setModalToggle, previousModalToggle }) => {

  const dispatch = useDispatch();
  const [language] = useAppLanguage();

  const [newMpin, setNewMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);
  const [mobileNumber] = useUserMobileNumber();

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  const onSubmit = () => {
    console.log(newMpin.length, confirmMpin.length, newMpin?.length != 6 ||
      confirmMpin?.length != 6 ||
      newMpin != confirmMpin);
    if (
      newMpin?.length != 6 ||
      confirmMpin?.length != 6 ||
      newMpin != confirmMpin
    ) {
      setError(true);
      return;
    }

    dispatch(resetMPIN({ payload: { mobile: mobileNumber, mpin: newMpin } }))
      .then(() => {
        setModalToggle(false);
        setSuccessCard(true);
        previousModalToggle(false);
      })
      .catch(() => {
        setError(true);
      })
  };

  return (
    <Modal
      isOpen={modalToggle}
      centered={true}
      toggle={modalToggleFunc}
      contentClassName='customStyle'
    >
      <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
        <p className='change_text'>
          {getLanguageText({ language, key: 'resetMPIn' })}
        </p>
      </ModalHeader>
      <ModalBody>
        <div className='d-flex flex-column align-items-center'>
          <input
            className='input_fields'
            type='number'
            placeholder={getLanguageText({ language, key: 'enterNewmPin' })}
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
            placeholder={getLanguageText({
              language,
              key: 'enterConfirmmPin',
            })}
            value={confirmMpin}
            onChange={event => {
              if (event.target.value.length <= 6)
                setConfirmMpin(event.target.value);
            }}
            onFocus={() => setError(false)}
          />

          <div className='note_section'>
            <p className='note-txt'>
              {getLanguageText({ language, key: 'note' })}
            </p>
            <p className='note-detail'>
              {getLanguageText({ language, key: 'mPinDetail' })}
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
        {
          errorCard &&
          <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
        }
        {
          successCard &&
          <ConfirmationSuccessModal
            modalToggle={successCard}
            setModalToggle={setSuccessCard}
          />
        }
      </ModalBody>
    </Modal>
  );
};

export default ResetMPinModal;
