import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { getLanguageText } from '../../language';
import { useDispatch, useSelector } from 'react-redux';
import useUserMobileNumber from '../../hooks/useUserMobileNumber';
import useAppLanguage from "../../hooks/useAppLanguage";
import { getCardsList, setCardHotlistAndFreeze } from '../../redux/actions/userData.action';
import './style.css';
import EnterMPINModal from '../../components/modal/mpin/EnterMPINModal';

const HotlistModal = ({ modalToggle, setModalToggle }) => {
  const dispatch = useDispatch();
  const { selectedCardDetails } = useSelector(state => ({
    selectedCardDetails: state.userDataReducer.selectedCardDetails
  }));

  const [mobileNumber] = useUserMobileNumber();
  const [selectedCard, setSelectedCard] = useState({});
  const [language] = useAppLanguage();
  const [isMPINAsked, setIsMPINAsked] = useState(false);

  useEffect(() => {
    if (selectedCardDetails?.cardNumber)
      setSelectedCard(selectedCardDetails);
  }, [selectedCardDetails]);

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const dispatchFreezeHotlistCardAction = ({ mpin }) => {
    const freezeCardPayload = {
      mobile: mobileNumber,
      cardNo: selectedCard.cardNumber,
      status: "blocked",
      mpin
    }

    dispatch(setCardHotlistAndFreeze({ payload: { ...freezeCardPayload } }))
      .then(() => {
        dispatch(getCardsList({ payload: { mobile: mobileNumber } }))
          .catch(err => console.log(err));
        setModalToggle(false);
      })
      .catch(err => {
        console.log('<<< Error in hotlisting card >>>\n', err);
      });
  }

  const onConfirm = () => {
    setIsMPINAsked(true);
  }

  return (
    <>
      <Modal
        isOpen={modalToggle}
        centered={true}
        toggle={modalToggleFunc}
        contentClassName='customStyle'
      >
        <ModalHeader className="d-flex justify-content-center">
          <p className='change_text'>
            {getLanguageText({ language, key: 'hotlistTitle' })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className='d-flex align-items-center flex-column'>
            <div>
              <p className='confirm_texxt'>
                {getLanguageText({ language, key: 'hotlistText' })}
              </p>
            </div>

            <div className='confirmatn_div'>
              <div className='confirm_sectn' onClick={() => onConfirm()}>
                <p className='confirm_txt'>
                  {getLanguageText({ language, key: 'yes' })}
                </p>
              </div>

              <div
                className='confirm_sectno'
                onClick={() => setModalToggle(false)}
              >
                <p className='confirm_txt_no'>
                  {getLanguageText({ language, key: 'no' })}
                </p>
              </div>
            </div>
          </div>
          {
            isMPINAsked &&
            <EnterMPINModal
              modalToggle={isMPINAsked}
              setModalToggle={setIsMPINAsked}
              callbackFunction={dispatchFreezeHotlistCardAction}
            />
          }
        </ModalBody>
      </Modal>
    </>
  );
};

export default HotlistModal;
