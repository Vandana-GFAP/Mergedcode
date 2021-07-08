import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import CustomButtom from '../button';
import ResetPasswordModal from './ResetPasswordModal';
import './style.css';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';
import ConfirmationSuccessModal from './ConfirmationSuccessModal';
import ErrorModal from './ErrorModal';

const ChangePasswordModal = props => {

  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };
  const UserData = useSelector(state => state.UserData) || {};

  const { language } = UserData || {};
  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image"/>
    </button>
  );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setError(false);
  }, [props]);

  const resetMPin = () => {
    console.log('Reset...');
    setModalToggle(false);
    setResetPasswordModal(true);
  };

  const onSubmit = () => {
    const validatePasswordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (
      oldPassword?.length < 1 ||
      newPassword?.length < 1 ||
      confirmPassword?.length < 1 ||
      newPassword != confirmPassword
    ) {
      setError(true);
      return;
    }

    if (!newPassword.match(validatePasswordExpression)) {
      setError(true);
      return;
    }

    //TODO: API call to update the password
    try {
      setModalToggle(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
      console.log('<<< Error in updating password >>>\n', err);
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

      <ResetPasswordModal
        modalToggle={resetPasswordModal}
        setModalToggle={setResetPasswordModal}
      />

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
              maxLength='6'
              placeholder={getLanguageText({ language, key: 'oldPassword' })}
              value={oldPassword}
              onChange={event => setOldPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='text'
              maxLength='6'
              placeholder={getLanguageText({ language, key: 'newPassword' })}
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='text'
              maxLength='6'
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
              <p className='forGot_link' onClick={() => resetMPin()}>
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
    </>
  );
};

export default ChangePasswordModal;
