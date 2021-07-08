import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import useUserMobileNumber from "../../../hooks/useUserMobileNumber";

import { closeIcon } from "../../../assets/images";
import CustomButtom from "../../button";
import GetOTPModal from "./GetOTPModal";
import { getLanguageText } from '../../../language';
import ConfirmationSuccessModal from '../output/ConfirmationSuccessModal';
import ErrorModal from '../output/ErrorModal';
import "../style.css";
import { changeUserPassword } from "../../../redux/actions/userData.action";
import useAppLanguage from "../../../hooks/useAppLanguage";

const ChangePasswordModal = ({ modalToggle, setModalToggle }) => {
  const dispatch = useDispatch();
  const [language] = useAppLanguage();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [mobileNumber] = useUserMobileNumber();

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

  const resetPassword = () => {
    console.log('Reset...');
    setResetPasswordModal(true);
    // setModalToggle(false);
  };

  const onSubmit = () => {
    console.log(oldPassword, newPassword, confirmPassword, newPassword !== confirmPassword);
    const validatePasswordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (
      oldPassword?.length < 1 ||
      newPassword?.length < 1 ||
      confirmPassword?.length < 1 ||
      newPassword !== confirmPassword
    ) {
      setError(true);
      return;
    }

    if (!newPassword.match(validatePasswordExpression)) {
      setError(true);
      return;
    }

    dispatch(changeUserPassword({ pwdPayload: { mobile: mobileNumber, mpasswd: oldPassword, newMpasswd: newPassword } }))
      .then(() => {
        setSuccess(true);
        setModalToggle(false);
      })
      .catch(() => {
        setError(true);
        setFailure(true);
      })
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
            {getLanguageText({ language, key: 'changePassword' })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className='d-flex flex-column align-items-center'>
            <input
              className='input_fields'
              type='text'
              // maxLength='6'
              placeholder={getLanguageText({ language, key: 'oldPassword' })}
              value={oldPassword}
              onChange={event => setOldPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='text'
              // maxLength='6'
              placeholder={getLanguageText({ language, key: 'newPassword' })}
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='text'
              // maxLength='6'
              placeholder={getLanguageText({
                language,
                key: 'confirmPassword',
              })}
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <div className='forgot_sections'>
              <p className='forGot_txt'>
                {getLanguageText({ language, key: 'forgotPassword' })}
              </p>
              <p className='forGot_link' onClick={resetPassword}>
                {getLanguageText({ language, key: 'resetPassword' })}
              </p>
            </div>

            <div className='note_section mt-1'>
              <p className='note-txt'>
                {getLanguageText({ language, key: 'note' })}
              </p>
              <div className='note-detail ml-2'>
                <ul className="dashed">Password should contain</ul>
                <li>Password should be atleast 6 char long</li>
                <li>It should contain atleast 1 Caps </li>
                <li>It should contain atleast 1 number </li>
                <li>It should contain atleast 1 special char</li>
              </div>
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
        resetPasswordModal &&
        <GetOTPModal
          modalToggle={resetPasswordModal}
          setModalToggle={setResetPasswordModal}
          previousModalToggle={setModalToggle}
          previousScreenName="changePwd"
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

export default ChangePasswordModal;
