import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { closeIcon } from '../../assets/images';
import CustomButtom from '../button';
import './style.css';
import ErrorModal from '../../components/modal/ErrorModal';
import ConfirmationSuccessModal from '../../components/modal/ConfirmationSuccessModal';
import { getLanguageText } from '../../language';
import { useSelector } from 'react-redux';

const NewMPinModal = props => {
  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const UserData = useSelector(state => state.UserData) || {};

  const { language } = UserData || {};

  const closeBtn = (
    <button className='closeBtn close' onClick={modalToggleFunc}>
      <img src={closeIcon}  alt="Close Icon Image" />
    </button>
  );

  const [newMpin, setNewMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);

  useEffect(() => {
    setNewMpin('');
    setConfirmMpin('');
    setError(false);
  }, [props]);

  const onSubmit = () => {
    if (
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
      setSuccessCard(true);
    } catch (err) {
      setError(true);
      // setErrorCard(true);
      console.log('<<< Error in updating m-Pin >>>\n', err);
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
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewMPinModal;
