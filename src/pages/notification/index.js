import React, { useEffect, useState } from 'react';
import { notifications, userData } from '../../dummyData/index';
import './style.css';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import * as actions from '../../redux/actions';

const Notification = props => {
  const { history = {} } = props || {};
  const [notificationList, setNotificationList] = useState([]);

  const UserData = useSelector(state => state.UserData) || {};
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      store.dispatch(actions.setUserData({ ...userData }));
    }
  }, []);

  useEffect(() => {
    //TODO: call backend for notifications
    setNotificationList(notifications);
  }, []);

  const readMore = ({ index }) => {
    const notificationData = document.querySelectorAll('.notification-text');
    notificationData[index].style.whiteSpace = 'unset';

    const readMoreText = document.querySelectorAll('.read-more');
    readMoreText[index].style.display = 'none';
  };

  const renderNotification = (item, index) => {
    const { text = '', date } = item;
    return (
      <div key={index} className='notification'>
        <div>
          <p className='notification-text'>{text}</p>
          <p className='read-more' onClick={() => readMore({ index })}>
            Read More
          </p>
        </div>
        <div className='notification-bottom'>
          <p>{new Date(date)?.toDateString()}</p>
          <p>{new Date(date)?.toLocaleTimeString()}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        // height: window.innerHeight
        height: '92vh',
      }}
    >
      <div className='box_notify'>
        {notificationList &&
          notificationList?.map((item, index) =>
            renderNotification(item, index)
          )}
      </div>
    </div>
  );
};

export default Notification;
