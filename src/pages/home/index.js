import React, { useEffect, useState } from 'react';
import './style.css';
import { cardDetails, userData } from '../../dummyData/index';
import Card from '../../components/card';
import { ImHome, ImBlocked } from 'react-icons/im';
import { GiReceiveMoney, GiTakeMyMoney, GiFrozenOrb } from 'react-icons/gi';
import { IoReceiptOutline } from 'react-icons/io5';
import { TiChartBar } from 'react-icons/ti';
import { AiFillUnlock } from 'react-icons/ai';
import FreezeModal from '../../components/modal/FreezeModal';
import HotlistModal from '../../components/modal/HotlistModal';
import RecentActivity from '../../components/recentActivity';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
import Carousel from 'react-elastic-carousel';
import { getLanguageText } from '../../language';
import Loader from "../../components/loader";

const Home = props => {
  const { history = {} } = props || {};
  const [loading, setLoading] = useState(false);

  
  const UserData = useSelector(state => state.UserData) || {};
  const { language } = UserData || {};
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
      onClick: () => {
        history.push('transaction');
      },
    },
    {
      title: getLanguageText({ language, key: 'payments' }),
      icon: <GiReceiveMoney className='bottom_icon' />,
      onClick: () => {
        history.push('payments');
      },
    },
  ];

  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [freezeCard, setFreezeCard] = useState(false);
  const [hotlistCard, setHotlistCard] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      try {
        store.dispatch(actions.setUserData({ ...userData }));
      } catch (err) {
        console.log('<<< Error in Fetching user data >>>\n', err);
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true)
    //TODO: API call to get card list
    try {
      setCardList(cardDetails);
      setLoading(false)
    } catch (err) {
      console.log('<<< Error in Fetching card details >>>\n', err);
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    setSelectedCard(cardList[0]);
  }, [cardList]);

  if (loading) return <Loader />;


  return (
    <div>
      <FreezeModal modalToggle={freezeCard} setModalToggle={setFreezeCard} />
      <HotlistModal modalToggle={hotlistCard} setModalToggle={setHotlistCard} />

      <div className='home_div'>
        <div className='card-balance-block'>
          <p className='card-balance'>
            <span className='card-balance-amt'>₹</span>
            {' ' + selectedCard?.cardBalance}
          </p>

          <p className='card-balance-text'>
            {getLanguageText({ language, key: 'cardBalance' })}
          </p>
        </div>

        <div className='slidecontainer'>
          <input
            type='range'
            min='1'
            max={selectedCard?.maxLimit}
            value={selectedCard?.utilizedLimit}
            className='slider'
            id='myRange'
            style={{
              background: `linear-gradient(90deg, #2694e3 ${
                (selectedCard?.utilizedLimit / selectedCard?.maxLimit) * 100
              }%, #fff 0% )`,
            }}
          />
        </div>

        <div className='utilized-limit'>
          <p>
            {getLanguageText({ language, key: 'utilizedLimit' })}: ₹{' '}
            {selectedCard?.utilizedLimit} / ₹ {selectedCard?.maxLimit}{' '}
          </p>
        </div>

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
            return <Card key={index} cardDetails={item} />;
          })}
        </Carousel>

        <div className='icons-block'>
          {selectedCard?.isFreeze ? (
            <>
              <div>
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
                <p>{getLanguageText({ language, key: 'setLimits' })}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <RecentActivity isCardFrozen={selectedCard?.isFreeze} />

      <div className='tab-box'>
        {tabs?.map((item, index) => {
          const { title, icon, onClick = () => {} } = item;
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
    </div>
  );
};

export default Home;
