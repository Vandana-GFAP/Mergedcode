import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { closeIcon } from "../../assets/images";
import CustomButtom from "../button";
import "./style.css";
import { userData } from "../../dummyData";
import ErrorModal from "../../components/modal/ErrorModal";
import ConfirmationSuccessModal from "../../components/modal/ConfirmationSuccessModal";
import { getLanguageText } from "../../language";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import * as actions from "../../redux/actions";
const BeneficiaryAccount = (props) => {
  const { history = {} } = props || {};

  const { modalToggle, setModalToggle } = props;

  const modalToggleFunc = () => {
    setModalToggle(!modalToggle);
  };

  const UserData = useSelector((state) => state.UserData) || {};

  const { language } = UserData || {};

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      store.dispatch(actions.setUserData({ ...userData }));
    }
  }, []);

  const closeBtn = (
    <button className="closeBtn close" onClick={modalToggleFunc}>
      <img src={closeIcon} alt="Close Icon Image" />
    </button>
  );

  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);
  const [name, setName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [ifsc, setIfsc] = useState("");

  const onSubmit = () => {
   const validateAccountExpression=/^[0-9]{9,18}$/;
   const validateIFSCExpression=/^[A-Z]{4}[0][0-9]{6}$/;
    const validateNameExpression=/^[A-Za-z]{3,20}$/;
    if (!accountNum.match(validateAccountExpression)){
      setError(true);
      return;
    } 
    
    if(!ifsc.match(validateIFSCExpression)){
      setError(true);
      return;
    }
    
    if(!name.match(validateNameExpression)){
      setError(true);
      return;
    }

    //TODO: API call to verify the phone number
    try {
      setModalToggle(false);
      setSuccessCard(true);
      setName('');
      setAccountNum('');
      setIfsc('')
    }
     catch (err) {
      setErrorCard(true);
      setError(true);
      console.log("<<< Error in Submitting Beneficiary Details >>>\n", err);
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
              type="text"
              value={name}
              onChange={(e) => {
                if (e.target.value.length <= 20) setName(e.target.value);
              }}
              placeholder={getLanguageText({
                language,
                key: "enterBeneficiaryName",
              })}
              onFocus={() => setError(false)}
            />

            <input
              className="input_fields"
              type="number"
              value={accountNum}
              onChange={(e) => {
                if (e.target.value.length <= 18)
                  setAccountNum(e.target.value);
              }}
              placeholder={getLanguageText({
                language,
                key: "enterBeneficiaryAccount",
              })}
              onFocus={() => setError(false)}
            />
            <input
              className="input_fields"
              type="text"
              value={ifsc}
              onChange={(e) => {
                if (e.target.value.length <= 11) setIfsc(e.target.value);
              }}
              placeholder={getLanguageText({
                language,
                key: "enterIFSc",
              })}
              onFocus={() => setError(false)}
            />
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

export default BeneficiaryAccount;
