import React, { useEffect, useState } from "react";
import { notifications } from "../../dummyData/index";
import "./style.css";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getCurrentUserDetails } from "../../redux/actions/userData.action";
import useUserMobileNumber from "../../hooks/useUserMobileNumber";
import useCheckTokensNotExists from "../../hooks/useCheckTokensNotExists";

const Notification = ({ history }) => {
  const dispatch = useDispatch();
  const [notificationList, setNotificationList] = useState([]);
  const [mobileNumber] = useUserMobileNumber();
  const [tokenNotExist] = useCheckTokensNotExists();

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

export default withRouter(Notification);
