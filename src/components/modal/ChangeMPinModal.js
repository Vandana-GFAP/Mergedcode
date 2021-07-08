import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import { userData } from '../../dummyData';
import CustomButtom from '../button';
import ResetMPinModal from './ResetMPinModal';
import './style.css';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';
import ConfirmationSuccessModal from './ConfirmationSuccessModal';
import ErrorModal from './ErrorModal';

const ChangeMPinModal = props => {

  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };
  const UserData = useSelector(state => state.UserData) || {};

  const { language } = UserData || {};

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  const [oldMpin, setOldMpin] = useState('');
  const [newMpin, setNewMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [resetMpinModal, setResetMpinModal] = useState(false);
  const [error, setError] = useState(false);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    setOldMpin('');
    setNewMpin('');
    setConfirmMpin('');

    setError(false);
  }, [props]);

  const resetMPin = () => {
    console.log('Reset...');
    setModalToggle(false);
    setResetMpinModal(true);
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

    //TODO: API call to update the m-pin
    try {
      setModalToggle(false);
      setSuccess(true);
    } catch (err) {
      console.log('<<< Error in updating m-Pin >>>\n', err);
      setError(true);
      setFailure(true);
    }
    // const responce = true;
    // if (responce) {
    //   setModalToggle(false);
    // } else {
    //   setError(true);
    // }
  };

  return (
    <>
      <ConfirmationSuccessModal
        modalToggle={success}
        setModalToggle={setSuccess}
      />

      <ErrorModal modalToggle={failure} setModalToggle={setFailure} />

      <ResetMPinModal
        modalToggle={resetMpinModal}
        setModalToggle={setResetMpinModal}
      />

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
    </>
  );
};

export default ChangeMPinModal;
