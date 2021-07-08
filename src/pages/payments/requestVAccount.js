import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import ProgressCard from "../../components/progressCard";
import { paymentBanner } from "../../assets/images";
import { cardDetails, userData } from "../../dummyData";
import store from "../../redux/store";
import * as actions from "../../redux/actions";
import { useSelector } from "react-redux";
import MainButton from "../../components/mainButton";
import { getLanguageText } from "../../language";
import ErrorModal from "../../components/modal/ErrorModal";
import ConfirmationSuccessModal from "../../components/modal/ConfirmationSuccessModal";
const RequestVAccount = (props) => {
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

  const { history = {} } = props || {};
  const [virtualId, setVirtualId] = useState("");
  const [ifsc, setIFSC] = useState("");
  const [isVIdValid, setIsVIdValid] = useState(false);
  const [isIFSCValid, setIsIFSCValid] = useState(false);
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

  const inputPaymentData = [
    {
      id: "vId",
      type:'number',
      label: getLanguageText({ language, key: "receiveVID" }),
      value: virtualId,
      onChange: (value) => {
        if (value.length <= 9) setVirtualId(value);
      },
      errorText: getLanguageText({ language, key: "errorVID" }),
      errorCheck: isVIdValid,
      setError: setIsVIdValid,
      placeholder: getLanguageText({ language, key: "vidPlaceholder" }),
    },
    {
      id: "ifsc",
      type:'text',
      label: getLanguageText({ language, key: "ifscCode" }),
      value: ifsc,
      onChange: (value) => {
        if (value.length <= 11) setIFSC(value);
      },
      errorText: getLanguageText({ language, key: "enterIFSCCode" }),
      errorCheck: isIFSCValid,
      setError: setIsIFSCValid,
      placeholder: getLanguageText({
        language,
        key: "placeholderIFSCCode",
      }),
    },
  ];

  const onSubmit = () => {

    const validateVIDExpression = /^[0-9]{9}$/;
    const validateIFSCExpression = /^[A-Z]{4}[0][0-9]{6}$/;

    if(!virtualId.match(validateVIDExpression)){
      setIsVIdValid(true);
      return;
    }
    
    if(!ifsc.match(validateIFSCExpression)){
      setIsIFSCValid(true);
      return;
    }

    //TODO: API call to verify the phone number
    try {
      setSuccessCard(true);
      setVirtualId('')
      setIFSC('')
    } catch (err) {
      setErrorCard(true);
      setError(true);
      console.log("<<< Error in Submitting Beneficiary Details >>>\n", err);
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
          value={value}
          type={type}
          onChange={(event) => onChange(event.target.value)}
          id={id}
          placeholder={placeholder}
          onFocus={() => setError(false)}
        />
        {errorCheck ? (
          <p
            style={{
              color: "red",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
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
        messageText="request_msg"
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
            {getLanguageText({ language, key: "requestVid" })}{" "}
          </p>
          <p className="requester_subtitle">
            {getLanguageText({ language, key: "requestVidSub" })}{" "}
            {" XXX XXX XXX " + String(selectedCard?.cardNumber)?.slice(12, 16)}
          </p>

          <div style={{ padding: "1rem 0" }}>
            {inputPaymentData?.map((item, index) =>
              renderData({ item, index })
            )}
          </div>
              
          <div style={{ paddingBottom: "10px" }}>
            <MainButton
              label={getLanguageText({
                language,
                key: "shareDetail",
              })}
              onClick={onSubmit}
            />
          </div>


          <div className="paymentImage">
            <img src={paymentBanner} alt="Payment Banner Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestVAccount;
