import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";

import { closeIcon } from "../../../assets/images";
import CustomButtom from "../../button";
import ResetMPinModal from "./ResetMPinModal";
import { confirmOTPForUser, getOTPForUser } from "../../../redux/actions/login.action";
import { getLanguageText } from '../../../language';
import useUserMobileNumber from "../../../hooks/useUserMobileNumber";
import useAppLanguage from "../../../hooks/useAppLanguage";

import "../style.css";

const GetMPinModal = ({ modalToggle, setModalToggle, previousModalToggle, previousScreenName }) => {
  const dispatch = useDispatch();
  const [language] = useAppLanguage();

  const [msgs, setMsg] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [newMPin, setNewMPin] = useState(false);
  const [mobileNumber] = useUserMobileNumber();

  useEffect(() => {
    return () => {
      if (previousScreenName === "changeMPIN")
        previousModalToggle(false);
    }
  }, []);

  useEffect(() => {
    if (mobileNumber)
      getOTP();
  }, [mobileNumber]);

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const getOTP = () => {
    dispatch(getOTPForUser({ otpPayload: { mobile: mobileNumber, otpType: "LOGIN_APP" } }))
      .then(() => console.log("OTP done"))
      .catch(err => console.log(err));
  }

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  const onConfirmOTP = () => {
    if (otp?.length != 6) {
      setError(true);
      setOtp('');
      return;
    }
    dispatch(confirmOTPForUser({ otpPayload: { mobile: mobileNumber, otp: otp, otpType: "LOGIN_APP" } }))
      .then(() => {
        console.log("OTP confirmed", previousModalToggle);
        setOtp('');
        setNewMPin(true);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  };

  const onResendOTP = () => {
    //TODO: API call to resend the m-pin
    console.log("Resend...");
    setMsg(true);
    setOtp('');
    getOTP();
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
          <p className='otp_txt'>
            {getLanguageText({ language, key: 'otpMobile' })} {mobileNumber}
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
            <p className='forGot_link' onClick={onResendOTP}>
              {getLanguageText({ language, key: 'resetOtp' })}
            </p>
          </div>
          {
            error && (
              <p className='error_validate'>
                {getLanguageText({ language, key: 'error' })}
              </p>
            )
          }
          {
            msgs && (
              <p className='error_validate'>
                {getLanguageText({ language, key: 'resendMsg' })}
              </p>
            )
          }
          <div className='btn_section'>
            <CustomButtom
              label={getLanguageText({ language, key: 'confirm' })}
              onClick={onConfirmOTP}
            />
          </div>
        </div>
        {
          newMPin &&
          <ResetMPinModal
            modalToggle={newMPin}
            setModalToggle={setNewMPin}
            previousModalToggle={setModalToggle}
          />
        }
      </ModalBody>
    </Modal>
  );
};

export default GetMPinModal;
