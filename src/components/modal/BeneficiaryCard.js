import React, { useState,useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { closeIcon } from "../../assets/images";
import CustomButtom from "../button";
import "./style.css";
import ErrorModal from "../../components/modal/ErrorModal";
import ConfirmationSuccessModal from "../../components/modal/ConfirmationSuccessModal";
import { getLanguageText } from "../../language";
import { userData } from '../../dummyData';
import { useSelector } from "react-redux";
import store from '../../redux/store';
import * as actions from '../../redux/actions';
const BeneficiaryCard = (props) => {
  const { history = {} } = props || {};

  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };


  // This card array will be received from backend

  const cardName=[
    'SBI Card','Axis Bank Card'
  ]

  const UserData = useSelector((state) => state.UserData) || {};

  const { language } = UserData || {};

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      store.dispatch(actions.setUserData({ ...userData }));
    }
  }, []);

  useEffect(()=>{
    setError(false);
  },[modalToggle]);

    const closeBtn = (
    <button className="closeBtn close" onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);
  const [selectedCard,setSelectedCard]=useState(false);
  const [phone,setPhone]=useState('');
// console.log(selectedCard);
  const onSubmit = () => {
    console.log(typeof selectedCard,selectedCard);
    const validatePhoneExpression = /^[7896][0-9]{9}$/;

    if (phone?.length != 10) {
      setError(true);
      return;
    }

    if(!phone.match(validatePhoneExpression)){
      setError(true);
     return;
    }

    if(!selectedCard || selectedCard=='false'){
      setError(true);
      return;
    }

    //TODO: API call to verify the phone number
    try {
      setModalToggle(false);
      setSuccessCard(true);
      setPhone('');
      setSelectedCard('');

    } catch (err) {
      setError(true);
      setErrorCard(true)
      console.log('<<< Error in Submitting Beneficiary Details >>>\n', err);
    }
  };

  return (
    <>
      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
      <ConfirmationSuccessModal
        modalToggle={successCard}
        setModalToggle={setSuccessCard}
        messageText="added_msg"
      />
      <Modal
        isOpen={modalToggle}
        centered={true}
        toggle={modalToggleFunc}
        contentClassName="customStyle"
      >
        <ModalHeader toggle={modalToggleFunc} close={closeBtn}>
          <p className="change_text">
            {getLanguageText({ language, key: "addBeneficiary" })}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className="d-flex flex-column align-items-center">
            <input
              className="input_fields"
              type="number"
              value={phone}
              onChange={(e)=>{if (e.target.value.length <= 10) setPhone(e.target.value)}}
              placeholder={getLanguageText({
                language,
                key: "enterPhoneNumber",
              })}
              onFocus={() => setError(false)}
            />

            <select
            defaultValue={false}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="input_field"
            >
            
              <option value={false} disabled>
                {getLanguageText({ language, key: "selectCard" })}
              </option>
              {
                cardName?.map((item,index)=>{
                  return <option key={index} value={item}>
                  {item}</option>

                })
              }
            </select>
            {error && (
              <p className="error_validate">
                {getLanguageText({ language, key: "error" })}
              </p>
            )}

            <div className="btn_section">
              <CustomButtom
                label={getLanguageText({ language, key: "addBeneficiary" })}
                onClick={onSubmit}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BeneficiaryCard;
