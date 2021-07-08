import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import CustomButtom from '../button';
import './style.css';
import NewMPinModal from './NewMPinModal';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';

const ResetMPinModal = props => {
  const { modalToggle, setModalToggle } = props;
  const { history = {} } = props || {};

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
  const [msgs, setMsg] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [newMPin, setNewMPin] = useState(false);

  useEffect(() => {
    setMsg(false);
    setOtp('');
    setError(false);
  }, [props]);

  const { phone } = UserData;

  const onSubmit = () => {
    if (otp?.length != 6) {
      setError(true);
      setOtp('');
      return;
    }

    //TODO: API call to verify the otp
    try {
      setModalToggle(false);
      setNewMPin(true);
    } catch (err) {
      setError(true);
      console.log('<<< Error in verifying OTP >>>\n', err);
    }
    // const responce = true;
    // if (responce) {
    //   setModalToggle(false);
    //   setNewMPin(true);
    // } else {
    //   setError(true);
    // }
  };

  const resend = () => {
    //TODO: API call to resend the m-pin
    try {
      setMsg(true);
      setOtp('');
    } catch (err) {
      console.log('<<< Error in reseting m-Pin >>>\n', err);
    }

    console.log('Resend...');
  };

  return (
    <>
      <NewMPinModal modalToggle={newMPin} setModalToggle={setNewMPin} />

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
            <p className='otp_txt'>
              {getLanguageText({ language, key: 'otpMobile' })} {phone}
            </p>
            <input
              className='input_fields'
              type='number'
              placeholder={getLanguageText({ language, key: 'otp' })}
              value={otp}
              onChange={event => {
                if (event.target.value.length <= 6) setOtp(event.target.value);
              }}
              onFocus={() => setError(false)}
            />

            <div className='forgot_sections'>
              <p className='forGot_txt'>
                {getLanguageText({ language, key: 'receiveOtp' })}
              </p>
              <p className='forGot_link' onClick={() => resend()}>
                {getLanguageText({ language, key: 'resetOtp' })}
              </p>
            </div>

            {error && (
              <p className='error_validate'>
                {' '}
                {getLanguageText({ language, key: 'error' })}
              </p>
            )}
            {msgs && (
              <p className='error_validate'>
                {getLanguageText({ language, key: 'resendMsg' })}
              </p>
            )}
            <div className='btn_section'>
              <CustomButtom
                label={getLanguageText({ language, key: 'confirm' })}
                onClick={onSubmit}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ResetMPinModal;
