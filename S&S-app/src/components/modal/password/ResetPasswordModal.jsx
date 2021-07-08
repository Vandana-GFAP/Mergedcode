import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import CustomButtom from "../../button";
import ErrorModal from '../output/ErrorModal';
import ConfirmationSuccessModal from '../output/ConfirmationSuccessModal';
import useUserMobileNumber from "../../../hooks/useUserMobileNumber";

import { getLanguageText } from '../../../language';
import { closeIcon } from "../../../assets/images";
import { setUserPassword } from "../../../redux/actions/userData.action";
import "../style.css";
import useAppLanguage from "../../../hooks/useAppLanguage";

const ResetPasswordModal = ({ modalToggle, setModalToggle, previousModalToggle }) => {

  const dispatch = useDispatch();
  const [language] = useAppLanguage();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);
  const [mobileNumber] = useUserMobileNumber();

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const closeBtn = (
    <button className="closeBtn close" onClick={modalToggleFunc}>
      <img src={closeIcon} />
    </button>
  );

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

    dispatch(setUserPassword({ pwdPayload: { mobile: mobileNumber, mpasswd: newPassword } }))
      .then(() => {
        setModalToggle(false);
        setSuccessCard(true);
        previousModalToggle(false);
      })
      .catch(() => {
        setError(true);
      })
  };

  console.log("New password modal=>", modalToggle);

  return (
    <Modal
      isOpen={modalToggle}
      centered={true}
      toggle={modalToggleFunc}
      contentClassName="customStyle"
    >
      <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
        <p className='change_text'>
          {getLanguageText({ language, key: 'resetPassword' })}
        </p>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column align-items-center">
          <input
            className="input_fields"
            type="text"
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

          <div className="note_section">
            <p className='note-txt'>
              {getLanguageText({ language, key: 'note' })}
            </p>
            <div className="note-detail ml-1">
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

export default ResetPasswordModal;