import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import ProgressCard from "../../components/progressCard";
import { cardDetails, userData } from "../../dummyData";
import store from "../../redux/store";
import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import MainButton from "../../components/mainButton";
import { getLanguageText } from "../../language";
import ErrorModal from "../../components/modal/ErrorModal";
import ConfirmationSuccessModal from "../../components/modal/ConfirmationSuccessModal";

const SendMoneyAccount = (props) => {
  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};
  const { history = {} } = props || {};
  const [phone, setPhone] = useState();
  const [accountNumber, setAccountNumber] = useState("");

  const [ifsc, setIFSC] = useState("");
  const [amount, setAmount] = useState("");
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);
  const [error, setError] = useState(false);
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isIFSCValid, setIsIFSCValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    //API call to get card list
    setCardList(cardDetails);
  }, []);

  useEffect(() => {
    setSelectedCard(cardList?.[0]);
  }, [cardList]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      try {
        store.dispatch(actions.setUserData({ ...userData }));
      } catch (err) {
        console.log("<<< Error in fetching user data >>>\n", err);
      }
    }
  }, []);

  const inputPaymentData = [
    {
      id: "phone",
      type:'number',
      label: getLanguageText({ language, key: "beneficiaryPhone" }),
      value: phone,
      onChange: (value) => {
        if (value.length <= 10) setPhone(value);
      },
      errorText: getLanguageText({ language, key: "beneficiaryValidPhone" }),
      errorCheck: isPhoneValid,
      setError: setIsPhoneValid,
      placeholder: getLanguageText({
        language,
        key: "beneficiaryPhonePlaceholder",
      }),
    },
    {
      id: "accountNumber",
      type:'number',
      label: getLanguageText({ language, key: "beneficiaryAccount" }),
      value: accountNumber,
      onChange: (value) => {
        if (value.length <= 18) setAccountNumber(value);
      },
      errorText: getLanguageText({ language, key: "beneficiaryValidAccount" }),
      errorCheck: isAccountValid,
      setError: setIsAccountValid,
      placeholder: getLanguageText({
        language,
        key: "beneficiaryAccountPlaceholder",
      }),
    },
    {
      id: "ifsc",
      type:'text',
      label: getLanguageText({ language, key: "beneficiaryIFSC" }),
      value: ifsc,
      onChange: (value) => {
        if (value.length <= 11) setIFSC(value);
      },
      errorText: getLanguageText({ language, key: "enterValidIFSC" }),
      errorCheck: isIFSCValid,
      setError: setIsIFSCValid,
      placeholder: getLanguageText({ language, key: "enterIFSCPlaceholder" }),
    },
    {
      id: "amount",
      type:'number',
      label: getLanguageText({ language, key: "enterAmount" }),
      value: amount,
      onChange: (value) => {
        if (value.length <= 6) setAmount(value);
      },
      errorText: getLanguageText({ language, key: "enterValidAmount" }),
      errorCheck: isAmountValid,
      setError: setIsAmountValid,
      placeholder: getLanguageText({ language, key: "enterAmountPlaceholder" }),
    },
  ];

  const onSubmit = () => {
    const validatePhoneExpression = /^[7896][0-9]{9}$/;
      const validAccount=/^[0-9]{9,18}$/;
      const validIFSC=/^[A-Z]{4}[0]{1}[0-9]{6}$/;

    if (phone?.length != 10) {
      setIsPhoneValid(true);
      return;
    }
    if(!phone.match(validatePhoneExpression)){
      setIsPhoneValid(true);
     return;
    }

    if (accountNumber?.length <= 9 && accountNumber?.length >= 18) {
      setIsAccountValid(true);
      return;
    }

    if(!accountNumber.match(validAccount)){
      setIsAccountValid(true);
     return;
    }


    if(ifsc?.length!=11){
      setIsIFSCValid(true);
      return;
    }

    if(!ifsc.match(validIFSC)){
      setIsIFSCValid(true);
     return;
    }

    if (!amount?.length){
      setIsAmountValid(true);
      return;
    }
  
    //TODO: API call to send money to account
    try {
      setSuccessCard(true);
      setAmount('')
      setIFSC('')
      setPhone('')
      setAccountNumber('')
    } catch (err) {
      setError(true);
      setErrorCard(true)
      console.log("<<< Error in Sending Money Via Account >>>\n", err);
    }
  };

  const renderData = ({ item, index }) => {
    const {
      id = "",
      type="",
      label = "",
      value = "",
      onChange = () => {},
      errorCheck = false,
      setError = () => {},
      errorText = "",
      placeholder = "",
    } = item;

    return (
      <div key={index} className="render-data">
        <label htmlFor={id}>{label}</label>
        <input
        type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          id={id}
          placeholder={placeholder}
          onFocus={() => setError(false)}
        />
        {errorCheck ? (
          <p style={{ color: "red", fontSize: 14, fontStyle: "italic" }}>
            {errorText}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
      <ConfirmationSuccessModal
        modalToggle={successCard}
        setModalToggle={setSuccessCard}
        messageText="send_msg"
      />
      <div className="requester-body">
        <Carousel
          preventDefaultTouchmoveEvent={true}
          enableMouseSwipe={true}
          enableSwipe={true}
          showArrows={false}
          initialFirstItem={0}
          onChange={({ item, index }) => {
            const { cardDetails = {} } = item || {};
            setSelectedCard(cardDetails);
          }}
        >
          {cardList?.map((item, index) => {
            return <ProgressCard key={index} cardDetails={item} />;
          })}
        </Carousel>
        <div className="requester_box">
          <p className="requester_title">
            {getLanguageText({ language, key: "sendMoneyAccount" })}
          </p>
          <p className="requester_subtitle">
            {getLanguageText({ language, key: "sendMoneyCards" })}
            {" XXX XXX XXX " + String(selectedCard?.cardNumber)?.slice(12, 16)}
          </p>
          <div style={{ padding: "1rem 0" }}>
            {inputPaymentData?.map((item, index) =>
              renderData({ item, index })
            )}
          </div>
          <div style={{ paddingBottom: "10px" }}>
            <MainButton
              label={getLanguageText({ language, key: "sendMoney" })}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyAccount;
