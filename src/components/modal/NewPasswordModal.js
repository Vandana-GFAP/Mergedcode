import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import CustomButtom from '../button';
import './style.css';
import ErrorModal from '../../components/modal/ErrorModal';
import ConfirmationSuccessModal from '../../components/modal/ConfirmationSuccessModal';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';

const NewPasswordModal = props => {
  const { modalToggle, setModalToggle } = props;
  const { history = {} } = props || {};

  const UserData = useSelector(state => state.UserData) || {};

  const { language } = UserData || {};
  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);

  useEffect(() => {
    setNewPassword('');
    setConfirmPassword('');

    setError(false);
  }, [props]);

  const onSubmit = () => {
    if (
      newPassword?.length < 1 ||
      confirmPassword?.length < 1 ||
      newPassword != confirmPassword
    ) {
      setError(true);
      return;
    }
    const validatePasswordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!newPassword.match(validatePasswordExpression)) {
      setError(true);
      return;
    }

    //TODO: API call to update the password

    try {
      setModalToggle(false);
      setSuccessCard(true);
    } catch (err) {
      setError(true);
      // setErrorCard(true);
      console.log('<<< Error in updating password >>>\n', err);
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
      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
      <ConfirmationSuccessModal
        modalToggle={successCard}
        setModalToggle={setSuccessCard}
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
            <input
              className='input_fields'
              type='text'
              placeholder={getLanguageText({ language, key: 'enterPassword' })}
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <input
              className='input_fields'
              type='text'
              placeholder={getLanguageText({
                language,
                key: 'confirmPassword',
              })}
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              onFocus={() => setError(false)}
            />

            <div className='note_section'>
              <p className='note-txt'>
                {getLanguageText({ language, key: 'note' })}
              </p>
              <div className='note-detail ml-1'>
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

export default NewPasswordModal;
