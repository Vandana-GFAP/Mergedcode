import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getLanguageText } from '../../language';
import './index.css';
import useAppLanguage from "../../hooks/useAppLanguage";

const renderActivity = ({ item, index, array }) => {
  const { categoryimg = "https://www.fintechfutures.com/files/2018/01/amazon-2.png", action, service, amount } = item;

  const sign = Math.sign(amount);
  const amounts = Math.abs(amount);

  return (
    <div key={index} className='category_section'>
      <div
        className='optional_c'
        style={{
          borderRadius:
            index === 0
              ? '1.3rem 1.3rem 0 0'
              : index + 1 === array?.length
                ? '0 0 1.3rem 1.3rem'
                : '0 0 0 0',
        }}
      >
        <div className='d-inline-flex align-items-center'>
          <img className='img_category' src={categoryimg} alt="merchant_logo" />
          <div className='pl-2 d-block align-items-center'>
            <p className='category_title'>{action}</p>
            <p className='category_subtitle'>{service}</p>
          </div>
        </div>
        <div>
          <p
            className='amt_rupee'
            style={{ color: sign === -1 ? '#6d7274' : '#4BBB56' }}
          >
            {sign === -1 ? '-' : '+'}₹{amounts}
          </p>
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({ isCardFrozen = false }) => {
  const { miniStatementResponse } = useSelector(state => ({
    miniStatementResponse: state.utilReducer.miniStatementResponse
  }));
  const [activityList, setActivityList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [yesterdayList, setYesterdayList] = useState([]);
  const [language] = useAppLanguage();

  useEffect(() => {
    if (miniStatementResponse?.data?.cardTransactionDetails)
      setActivityList(miniStatementResponse.data.cardTransactionDetails);
  }, [miniStatementResponse]);


  //for dummy data

  useEffect(() => {
    setTodayList(activityList);
  }, [activityList])


  // useEffect(() => {
  //   //TODO: API call to get activity list
  //   try {
  //     setActivityList(recentData);
  //   } catch (err) {
  //     console.log('<<< Error in Fetching Activity List >>>\n', err);
  //   }
  // }, []);

  console.log("miniStatementResponse", activityList, miniStatementResponse);

  // useEffect(() => {
  //   let todayArray = [];
  //   let yesterdayArray = [];

  //   const today = new Date();
  //   const yesterday = new Date(today);
  //   yesterday.setDate(yesterday.getDate() - 1);

  //   todayArray = activityList?.filter((item, index) => {
  //     const { date } = item;
  //     if (new Date(date).getDate() === today.getDate()) return item;
  //   });
  //   setTodayList(todayArray);

  //   yesterdayArray = activityList?.filter((item, index) => {
  //     const { date } = item;
  //     if (new Date(date).getDate() === yesterday.getDate()) return item;
  //   });
  //   setYesterdayList(yesterdayArray);
  // }, [activityList]);

  return (
    <>
      <div className='Recent_box'>
        {isCardFrozen && (
          <div className='card-frozen'>
            <p className='card-frozen-title'>
              {getLanguageText({ language, key: 'frozenTitle' })}
            </p>
            <p className='card-frozen-subtitle'>
              {getLanguageText({ language, key: 'frozenDetail' })}
            </p>
          </div>
        )}
        <div className='d-flex justify-content-between align-items-center'>
          <p className='recentTitle'>{getLanguageText({ language, key: 'recentActivity' })}</p>
          <p className='recent_all'>{getLanguageText({ language, key: 'seeAll' })}</p>
        </div>
        <>
          <div className='date-title'>
            <p>{getLanguageText({ language, key: 'today' })}</p>
          </div>
          {todayList?.length > 0 ? (
            <div className='list-box'>
              {todayList?.map((item, index, array) => {
                return renderActivity({ item, index, array });
              })}
            </div>
          ) : (
            <div className='no-data'>
              <p>{getLanguageText({ language, key: 'noData' })}</p>
            </div>
          )}
        </>
        <>
          <div className='date-title'>
            <p>{getLanguageText({ language, key: 'yesterday' })}</p>
          </div>
          {yesterdayList?.length > 0 ? (
            <div className='list-box'>
              {yesterdayList?.map((item, index, array) => {
                return renderActivity({ item, index, array });
              })}
            </div>
          ) : (
            <div className='no-data'>
              <p>No Data For Yesterday!!</p>
            </div>
          )}
        </>
      </div>
    </>
  );
};



export default withRouter(RecentActivity);
