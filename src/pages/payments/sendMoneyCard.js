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
const SendMoneyCard = (props) => {
  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};
  const { history = {} } = props || {};
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  const [amount, setAmount] = useState('');

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardList, setCardList] = useState([]);
  const [errorCard, setErrorCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);
  const [error, setError] = useState(false);

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


  const onSubmit = () => {
    const validatePhoneExpression = /^[7896][0-9]{9}$/;
    const validCardNumberExpression=/^[0-9]{12}$/;
    if (phone?.length != 10){
     setIsPhoneValid(true);
     return;
    }

    if(!phone.match(validatePhoneExpression)){
      setIsPhoneValid(true);
     return;
    }

     if(!card.match(validCardNumberExpression)){
      setIsCardValid(true);
     return;
    }

     if(!amount?.length){ 
      setIsAmountValid(true);
      return;
    }
   
    //TODO: API call to send money to account

    try {
      setSuccessCard(true);
     setPhone('');
     setCard('')
     setAmount('')

    } catch (err) {
      setError(true);
      setErrorCard(true);
      console.log("<<< Error in Sending Money Via Account >>>\n", err);
    }
  };

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
      id: "card",
      type:'number',
      label: getLanguageText({ language, key: "beneficiaryCard" }),
      value: card,
      onChange: (value) => {
        if (value.length <= 12) setCard(value);
      },
      errorText: getLanguageText({ language, key: "enterValidCard" }),
      errorCheck: isCardValid,
      setError: setIsCardValid,
      placeholder: getLanguageText({
        language,
        key: "enterCardPlaceholder",
      }),
    },
    {
      id: "amount",
      type:'number',
      label: getLanguageText({ language, key: "enterAmount" }),
      value: amount,
      onChange: (value) => {
        if (value.length < 6) setAmount(value);
      },
      errorText: getLanguageText({ language, key: "enterValidAmount" }),
      errorCheck: isAmountValid,
      setError: setIsAmountValid,
      placeholder: getLanguageText({ language, key: "enterAmountPlaceholder" }),
    },
  ];
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
        <input type={type}
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
            {getLanguageText({ language, key: "sendMoneyCard" })}
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
              onClick={() => onSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyCard;
