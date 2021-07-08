import React, { useEffect, useState } from 'react';
import ProgressCard from '../../components/progressCard';
import './index.css';
import { cardDetails, userData } from '../../dummyData';
import Boxdata from '../../components/boxData';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import * as actions from '../../redux/actions';
import Carousel from 'react-elastic-carousel';
import { getLanguageText } from '../../language';

const SetLimit = props => {
  const { history = {} } = props || {};

  const [cardList, setCardList] = useState([]);

  const [activeTab, setActiveTab] = useState('Periodic');

  const [dailyTransaction, setDailyTransaction] = useState(500);
  const [dailyTransactionLimit, setDailyTransactionLimit] = useState(1000);
  const [isDailyTransactionDisabled, setIsDailyTransactionDisabled] = useState(
    false
  );

  const [monthlyTransaction, setMonthlyTransaction] = useState(300);
  const [monthlyTransactionLimit, setMonthlyTransactionLimit] = useState(1000);
  const [
    isMonthlyTransactionDisabled,
    setIsMonthlyTransactionDisabled,
  ] = useState(true);

  const [eCommerce, setECommerce] = useState(0);
  const [eCommerceLimit, setECommerceLimit] = useState(1000);
  const [isECommerceDisabled, setIsECommerceDisabled] = useState(false);

  const [pos, setPos] = useState(0);
  const [posLimit, setPosLimit] = useState(1000);
  const [isPosDisabled, setIsPosDisabled] = useState(false);

  const [atm, setAtm] = useState(0);
  const [atmLimit, setAtmLimit] = useState(1000);
  const [isAtmDisabled, setIsAtmDisabled] = useState(false);

  useEffect(() => {
    setCardList(cardDetails);
  }, []);

  const UserData = useSelector(state => state.UserData) || {};
  const { language } = UserData || {};

  useEffect(() => {

    if (!localStorage.getItem('token')) {
      history.push('/');
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      try {

        store.dispatch(actions.setUserData({ ...userData }));
      } catch (err) {

        console.log('<<< Error in fetching user data >>>\n', err);
      }
    }
  }, []);

  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    setSelectedCard(cardList[0]);
  }, [cardList]);



  
  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      <div className='set-limit-body'>
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
        <div className='setbox'>
          <p className='settitle'>{getLanguageText({ language, key: 'setLimits' })}</p>
          <div className='d-flex justify-content-between py-3'>
            <div
              className='btn_color'
              style={{
                backgroundColor: activeTab === 'Periodic' ? '#29529F' : 'white',
                color: activeTab === 'Periodic' ? 'white' : '#29529F',
              }}
              onClick={() => setActiveTab('Periodic')}
            >
              {getLanguageText({ language, key: 'periodic' })}
            </div>
            <div
              className='btn_color'
              style={{
                backgroundColor: activeTab === 'Channel' ? '#29529F' : 'white',
                color: activeTab === 'Channel' ? 'white' : '#29529F',
              }}
              onClick={() => setActiveTab('Channel')}
            >
              {getLanguageText({ language, key: 'channel' })}
            </div>
          </div>
          {activeTab === 'Periodic' && (
            <div>
              <Boxdata
                value={dailyTransaction}
                setValue={setDailyTransaction}
                max={dailyTransactionLimit}
                title={getLanguageText({ language, key: 'dailyLimit' })}
                isDisabled={isDailyTransactionDisabled}
              />
              <Boxdata
                value={monthlyTransaction}
                setValue={setMonthlyTransaction}
                max={monthlyTransactionLimit}
                title={getLanguageText({ language, key: 'monthlyLimit' })}
                isDisabled={isMonthlyTransactionDisabled}
              />
            </div>
          )}
          {activeTab === 'Channel' && (
            <div>
              <Boxdata
                value={eCommerce}
                setValue={setECommerce}
                max={eCommerceLimit}
                title={getLanguageText({ language, key: 'ecomLimit' })}
                subtitle={getLanguageText({ language, key: 'ecomSubtitle' })}
                isDisabled={isECommerceDisabled}
              />
              <Boxdata
                value={pos}
                setValue={setPos}
                max={posLimit}
                title={getLanguageText({ language, key: 'posLimit' })}
                subtitle={getLanguageText({ language, key: 'posSubtitle' })}
                isDisabled={isPosDisabled}
              />
              <Boxdata
                value={atm}
                setValue={setAtm}
                max={atmLimit}
                title={getLanguageText({ language, key: 'atmLimit' })}
                subtitle={getLanguageText({ language, key: 'atmSubtitle' })}
                isDisabled={isAtmDisabled}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SetLimit;
