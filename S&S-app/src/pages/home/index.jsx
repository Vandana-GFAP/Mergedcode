import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { ImHome, ImBlocked } from "react-icons/im";
import { GiReceiveMoney, GiTakeMyMoney, GiFrozenOrb } from "react-icons/gi";
import { IoReceiptOutline } from "react-icons/io5";
import { TiChartBar } from "react-icons/ti";
import { AiFillUnlock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Carousel from 'react-elastic-carousel';

import Card from "../../components/card";
import FreezeModal from "../../components/modal/FreezeModal";
import HotlistModal from "../../components/modal/HotlistModal";
import RecentActivity from "../../components/recentActivity";
import useUserMobileNumber from "../../hooks/useUserMobileNumber";
import { getCardBalanceAndLimitDetails, getCardsList, setCardHotlistAndFreeze } from "../../redux/actions/userData.action";
import { getLanguageText } from '../../language';
import { getMiniStatement } from "../../redux/actions/util.action";
import { SET_SELECTED_CARD_DETAILS } from "../../redux/types";
import { dispatchAction } from "../../redux/actions";
import useAppLanguage from "../../hooks/useAppLanguage";
import EnterMPINModal from '../../components/modal/mpin/EnterMPINModal';
import "./style.css";

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const { currentUserCardList, currentUserCardBalanceAndLimit } = useSelector(state => ({
    currentUserCardList: state.userDataReducer.currentUserCardList,
    currentUserCardBalanceAndLimit: state.userDataReducer.currentUserCardBalanceAndLimit
  }));

  const [cardList, setCardList] = useState(currentUserCardList || []);
  const [selectedCard, setSelectedCard] = useState({});
  const [freezeCard, setFreezeCard] = useState(false);
  const [hotlistCard, setHotlistCard] = useState(false);
  const [loading, setLoading] = useState(false)
  const [mobileNumber] = useUserMobileNumber();
  const [language] = useAppLanguage();
  const [isMPINAsked, setIsMPINAsked] = useState(false);

  console.log("cardList", cardList);

  useEffect(() => {
    if (mobileNumber) {
      setLoading(true);
      dispatch(getCardsList({ payload: { mobile: mobileNumber } }))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [dispatch, mobileNumber]);

  useEffect(() => {
    setCardList(currentUserCardList);
  }, [currentUserCardList]);

  useEffect(() => {
    const { cardNumber } = selectedCard;
    console.log(selectedCard, cardNumber);
    if (Object.keys(selectedCard).length && cardNumber) {
      dispatch(getMiniStatement({ payload: { mobile: mobileNumber, cardNo: cardNumber } }))
        .catch(err => console.log(err));
      dispatch(getCardBalanceAndLimitDetails({ payload: { mobile: mobileNumber, cardNo: cardNumber } }))
        .catch(err => console.log(err));
    }
  }, [selectedCard, mobileNumber, dispatch]);

  useEffect(() => {
    if (cardList.length) {
      setSelectedCard(cardList[0]);
      dispatch(dispatchAction({ type: SET_SELECTED_CARD_DETAILS, payload: cardList[0] }));
    }
  }, [cardList, dispatch]);

  const tabs = [
    {
      title: getLanguageText({ language, key: 'home' }),
      icon: <ImHome className='bottom_icon' />,
      onClick: () => {
        history.push('home');
      },
    },
    {
      title: getLanguageText({ language, key: 'transaction' }),
      icon: <IoReceiptOutline className='bottom_icon' />,
      // onClick: () => {
      //   history.push('transaction');
      // },
    },
    {
      title: getLanguageText({ language, key: 'payments' }),
      icon: <GiReceiveMoney className='bottom_icon' />,
      // onClick: () => {
      //   history.push('payments');
      // },
    },
  ];

  const dispatchUnFreezeCardAction = ({ mpin }) => {
    const freezeCardPayload = {
      mobile: mobileNumber,
      cardNo: selectedCard.cardNumber,
      status: "active",
      mpin
    }

    dispatch(setCardHotlistAndFreeze({ payload: { ...freezeCardPayload } }))
      .then(() => {
        dispatch(getCardsList({ payload: { mobile: mobileNumber } }))
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log('<<< Error in hotlisting card >>>\n', err);
      });
  }

  const setUnfreezeCard = () => {
    setIsMPINAsked(true);
  }

  const { availableBalance, cardLoadMonthlyLimit, usedCardLoadMonthlyLimit } = currentUserCardBalanceAndLimit;
  console.log(selectedCard);
  const isFreeze = selectedCard?.status === "suspend" ? true : false;
  return (
    <>
      <div className='home_div'>
        <div className='card-balance-block'>
          <p className='card-balance'>
            <span className='card-balance-amt'>₹</span>
            {' ' + availableBalance}
          </p>

          <p className='card-balance-text'>
            {getLanguageText({ language, key: 'cardBalance' })}
          </p>
        </div>

        <div className='slidecontainer'>
          <input
            type='range'
            min='1'
            max={cardLoadMonthlyLimit}
            value={usedCardLoadMonthlyLimit}
            className='slider'
            id='myRange'
            style={{
              background: `linear-gradient(90deg, #2694e3 ${(usedCardLoadMonthlyLimit / cardLoadMonthlyLimit) * 100
                }%, #fff 0% )`,
            }}
          />
        </div>

        <div className='utilized-limit'>
          <p>
            {getLanguageText({ language, key: 'utilizedLimit' })}: ₹{' '}
            {usedCardLoadMonthlyLimit} / ₹ {cardLoadMonthlyLimit}{' '}
          </p>
        </div>

        <Carousel
          preventDefaultTouchmoveEvent={true}
          enableMouseSwipe={true}
          enableSwipe={true}
          showArrows={false}
          initialFirstItem={0}
          onChange={({ item }) => {
            const { cardDetails = {} } = item || {};
            setSelectedCard(cardDetails);
            dispatch(dispatchAction({ type: SET_SELECTED_CARD_DETAILS, payload: cardDetails }));
          }}
        >
          {cardList?.map((item, index) => {
            return <Card key={index} cardDetails={item} />;
          })}
        </Carousel>

        <div className='icons-block'>
          {isFreeze ? (
            <>
              <div onClick={setUnfreezeCard}>
                <AiFillUnlock className='btn_icns' />
                <p>{getLanguageText({ language, key: 'unfreeze' })}</p>
              </div>

              <div onClick={() => setHotlistCard(true)}>
                <ImBlocked className='btn_icns' />
                <p>{getLanguageText({ language, key: 'hotlistCard' })}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <GiTakeMyMoney
                  className='btn_icns'
                  onClick={() => history.push('addmoney')}
                />
                <p>{getLanguageText({ language, key: 'addMoney' })}</p>
              </div>

              <div onClick={() => setFreezeCard(true)}>
                <GiFrozenOrb className='btn_icns' />
                <p>{getLanguageText({ language, key: 'freeze' })}</p>
              </div>

              <div onClick={() => history.push('setLimit')}>
                <TiChartBar className='btn_icns' />
                <p>{getLanguageText({ language, key: 'setLimit' })}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <RecentActivity isCardFrozen={isFreeze} />
      <div className='tab-box'>
        {tabs?.map((item, index) => {
          const { title, icon, onClick = () => { } } = item;
          return (
            <div
              key={index}
              className='tab-child'
              onClick={() => onClick()}
              style={{
                border: title === 'Home' ? 'solid #29529F' : '',
                borderWidth: title === 'Home' ? '0 0 4px 0' : '',
              }}
            >
              {icon}
              <p>{title}</p>
            </div>
          );
        })}
      </div>
      {
        freezeCard &&
        <FreezeModal
          modalToggle={freezeCard}
          setModalToggle={setFreezeCard}
        />
      }
      {
        hotlistCard &&
        <HotlistModal
          modalToggle={hotlistCard}
          setModalToggle={setHotlistCard}
        />
      }
      {
        isMPINAsked &&
        <EnterMPINModal
          modalToggle={isMPINAsked}
          setModalToggle={setIsMPINAsked}
          callbackFunction={dispatchUnFreezeCardAction}
        />
      }
    </>
  );
};

export default withRouter(Home);
