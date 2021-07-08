import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import CustomButtom from '../button';
import './style.css';
import NewPasswordModal from './NewPasswordModal';
import { useSelector } from 'react-redux';
import { getLanguageText } from '../../language';
const ResetPasswordModal = props => {
  const { history = {} } = props || {};

  const { modalToggle, setModalToggle, phoneNumber = false } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );
  const [msgs, setMsg] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  useEffect(() => {
    setMsg(false);
    setOtp('');

    setError(false);
  }, [props]);

  const UserData = useSelector(state => state.UserData) || {};
  const { phone: userMobile } = UserData;
  const { language } = UserData || {};

  const [phone, setPhone] = useState(phoneNumber ? phoneNumber : userMobile);

  useEffect(() => {
    if (phoneNumber?.length > 0) setPhone(phoneNumber);
  }, [phoneNumber]);

  const onSubmit = () => {
    if (otp?.length != 6) {
      setError(true);
      setOtp('');
      return;
    }

    //TODO: API call to verify the otp
    try {
      setOtp('');
      setModalToggle(false);
      setNewPassword(true);
    } catch (err) {
      setError(true);
      console.log('<<< Error in verifying OTP >>>\n', err);
    }
    // const response = true;
    // if (response) {
    //   setModalToggle(false);
    //   setNewPassword(true);
    // } else {
    //   setError(true);
    // }
  };

  const resend = () => {
    //TODO: API call to resend the otp
    try {
      setMsg(true);
      setOtp('');
    } catch (err) {
      console.log('<<< Error in Resending OTP >>>\n', err);
    }
    console.log('Resend...');
  };

  return (
    <>
      <NewPasswordModal
        modalToggle={newPassword}
        setModalToggle={setNewPassword}
      />

      <Modal
        isOpen={modalToggle}
        centered={true}
        toggle={modalToggleFunc}
        contentClassName='customStyle'
      >
        <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
          <p className='change_text'>
            {getLanguageText({ language, key: 'resetPassword' })}
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

export default ResetPasswordModal;
