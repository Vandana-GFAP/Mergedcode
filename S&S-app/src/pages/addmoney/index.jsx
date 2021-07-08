import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withRouter } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';

import MainButton from '../../components/mainButton';
import { getLanguageText } from '../../language';
import { cardDetails, boxDebit } from "../../dummyData";
import ProgressCard from "../../components/progressCard/index";
import "./index.css";
import useAppLanguage from "../../hooks/useAppLanguage";

const constantAmount = [500, 1000, 2000];

const AddMoney = () => {

  const [amount, setAmount] = useState('');
  const [cardList, setCardList] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [language] = useAppLanguage();

  const proceed = () => {
    //TODO: API call to do further work
    // try {
    //   const updatedUserData = {
    //     ...userData,
    //   }; //* Received from backend

    //   dispatch(actions.setUserData({ ...updatedUserData }));
    // } catch (err) {
    //   console.log('<<< Error in Proceeding further >>>\n', err);
    // }
  };

  const showNote = str => {
    for (const element of paymentOptions) {
      if (element.value === str) return element?.note;
    }
  };

  // useEffect(() => {
  //   if (tokenNotExist)
  //     history.push('/');
  // }, []);

  // useEffect(() => {
  //   if (mobileNumber)
  //     dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }))
  //       .catch(err => console.log(err));
  // }, [mobileNumber]);

  useEffect(() => {
    //TODO: API call to get card details
    try {
      setCardList(cardDetails);
    } catch (err) {
      console.log('<<< Error in fetching card details >>>\n', err);
    }

    //TODO: API call to fetch payment options
    try {
      setPaymentOptions(boxDebit);
      setSelectedPaymentOption(boxDebit[0]?.value); //* Selecting first method of payment by default
    } catch (err) {
      console.log('<<< Error in fetching payment options >>>\n', err);
    }
  }, []);

  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    setSelectedCard(cardList[0]);
  }, [cardList]);

  return (
    <>
      <div className='moneydiv01'>
        <Carousel
          preventDefaultTouchmoveEvent={true}
          enableMouseSwipe={true}
          enableSwipe={true}
          showArrows={false}
          initialFirstItem={0}
          onChange={({ item }) => {
            const { cardDetails = {} } = item || {};
            setSelectedCard(cardDetails);
          }}
        >
          {cardList?.map((item, index) => {
            return <ProgressCard key={index} cardDetails={item} />;
          })}
        </Carousel>
        <div className='moneycard01'>
          <p className='money_boxtitle'>{getLanguageText({ language, key: 'addMoney' })}</p>

          <p className='money_boxsubtitle'>{getLanguageText({ language, key: 'selectMode' })}</p>

          <RadioGroup
            value={selectedPaymentOption}
            onChange={event => setSelectedPaymentOption(event.target.value)}
            className='select_type_div'
          >
            {paymentOptions?.map((item, index) => {
              const { label, value } = item;
              return (
                <FormControlLabel
                  key={index}
                  value={value}
                  control={<Radio color='primary' />}
                  label={label}
                  className='select_type-Form'
                />
              );
            })}
          </RadioGroup>

          <p className='money_boxtxt01'>{getLanguageText({ language, key: 'enterCardAmount' })}</p>

          <div className='d-flex'>
            {constantAmount?.map((item, index) => {
              return (
                <span
                  className='amt_box'
                  key={index}
                  onClick={() => setAmount(item)}
                >
                  <p> ₹ {item}</p>
                </span>
              );
            })}
          </div>

          <div className='amt_pad d-flex align-items-center'>
            <p>₹</p>
            <input
              value={amount}
              onChange={event => {
                setAmount(event.target.value);
              }}
              type='number'
              placeholder={getLanguageText({ language, key: 'enterAmount' })}
            />
          </div>

          <div className='d-flex align-items-center pb-3'>
            <p className='section01'>{getLanguageText({ language, key: 'note' })}</p>

            <p className='section02'>{showNote(selectedPaymentOption)}</p>
          </div>
          <MainButton label={getLanguageText({ language, key: 'proceed' })} onClick={() => proceed()} />
        </div>
      </div>
    </>
  );
};
export default withRouter(AddMoney);
