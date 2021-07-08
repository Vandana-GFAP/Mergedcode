import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChangeMPinModal from '../../components/modal/mpin/ChangeMPinModal';
import ChangePasswordModal from '../../components/modal/password/ChangePasswordModal';

import useUserMobileNumber from '../../hooks/useUserMobileNumber';
import useAppLanguage from '../../hooks/useAppLanguage';
import { updateAppLanguage, updateNotificationAllowed } from '../../redux/actions/util.action';
import { getCurrentUserDetails } from '../../redux/actions/userData.action';
import { getLanguageText } from '../../language';
import './index.css';
import EnterMPINModal from '../../components/modal/mpin/EnterMPINModal';

const getAppLanguageID = ({ language }) => {
  switch (language) {
    case "hi": return "2";
    default: return "1";
  }
}

const getAppLanguage = ({ languageFlag }) => {
  switch (languageFlag) {
    case true: return "hi";
    default: return "en";
  }
}

const getAppNotificationValue = ({ notificationFlag }) => {
  // console.log("notificationFlag", notificationFlag);
  switch (notificationFlag) {
    case true: return "1";
    default: return "0";
  }
}

const Setting = ({ history }) => {
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector(state => ({
    currentUserDetails: state.userDataReducer.currentUserDetails,
  }));

  const [notificationFlag, setNotificationFlag] = useState(false);
  const [languageFlag, setLanguageFlag] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeMpin, setChangeMpin] = useState(false);
  const [isMPINAsked, setIsMPINAsked] = useState(false);
  const [optionClicked, setOptionClicked] = useState("");

  const [mobileNumber] = useUserMobileNumber();
  const [language, isNotificationAllowed] = useAppLanguage();

  console.log("hooks", language, isNotificationAllowed);

  useEffect(() => {
    switch (language) {
      case "hi": {
        setLanguageFlag(true);
        break;
      }
      default: {
        setLanguageFlag(false);
      }
    }
  }, [language]);

  useEffect(() => {
    switch (isNotificationAllowed) {
      case true: {
        setNotificationFlag(true);
        break;
      }
      default: {
        setNotificationFlag(false);
      }
    }
  }, [isNotificationAllowed]);

  const dispatchUpdateNotificationAction = ({ mpin }) => {
    dispatch(updateNotificationAllowed({ payload: { mobile: mobileNumber, mpin, appNotificationFlag: getAppNotificationValue({ notificationFlag }) } }))
      .then(() => {
        dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }));
      })
      .catch(err => console.error(err));
  }

  const dispatchUpdateLanguageAction = ({ mpin }) => {
    let currentLang = getAppLanguage({ languageFlag });
    console.log("currentLang", currentLang);
    dispatch(updateAppLanguage({ payload: { mobile: mobileNumber, mpin, appLangId: getAppLanguageID({ language: currentLang }) } }))
      .then(() => {
        dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }));
      })
      .catch(err => console.error(err));
  }

  const onNotificationClick = e => {
    console.log("notificationFlag", e);
    setOptionClicked("notification");
    setNotificationFlag(e);
    getAppNotificationValue({ notificationFlag: notificationFlag });
    setIsMPINAsked(true);
  }

  const onLanguageClick = e => {
    setLanguageFlag(e);
    setOptionClicked("language");
    let currentLang = getAppLanguage({ languageFlag: e });
    console.log("currentLang", currentLang);
    setIsMPINAsked(true);
  };

  const options = [
    {
      type: 'toggle',
      heading: getLanguageText({ language, key: 'notification' }),
      subheading: getLanguageText({ language, key: 'notificationSubHeading' }),
      value: notificationFlag,
      onClick: onNotificationClick,
    },
    {
      type: 'toggle',
      heading: getLanguageText({ language, key: 'languages' }),
      subheading: getLanguageText({ language, key: 'toggleLanguages' }),
      value: languageFlag,
      onClick: onLanguageClick,
    },
    {
      type: 'btn',
      heading: getLanguageText({ language, key: 'changePassword' }),
      subheading: getLanguageText({
        language,
        key: 'changePasswordSubheading',
      }),
      value: changePassword,
      btnLabel: 'Change Password',
      onClick: setChangePassword,
    },
    {
      type: 'btn',
      heading: getLanguageText({ language, key: 'changeMPIn' }),
      subheading: getLanguageText({ language, key: 'changeMPInSubheading' }),
      value: changeMpin,
      btnLabel: 'Change m-Pin',
      onClick: setChangeMpin,
    },
  ];

  const renderToggle = ({ item, index }) => {
    const { heading, subheading, value, onClick } = item;
    return (
      <div key={index} className='box01'>
        <div>
          <p className='box_heading01'>{heading}</p>
          <p className='box_subheading01'>{subheading}</p>
        </div>
        <Switch
          checked={value}
          onChange={e => onClick(e.target.checked)}
          color='primary'
          name='checkedB'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
    );
  };

  const renderBtn = ({ item, index }) => {
    const { heading, subheading, onClick } = item;
    return (
      <div onClick={() => onClick(true)} key={index} className='box01'>
        <div>
          <p className='box_heading01'>{heading}</p>
          <p className='box_subheading01'>{subheading}</p>
        </div>
        <div className='arrow_div'>
          <IoIosArrowForward className='arrow_style' />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        height: '92vh',
      }}
    >
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {options?.map((item, index) => {
          const { type } = item;
          if (type === 'toggle') {
            return renderToggle({ item, index });
          } else {
            return renderBtn({ item, index });
          }
        })}
      </div>
      {
        changeMpin &&
        <ChangeMPinModal
          modalToggle={changeMpin}
          setModalToggle={setChangeMpin}
        />
      }
      {
        changePassword &&
        <ChangePasswordModal
          modalToggle={changePassword}
          setModalToggle={setChangePassword}
        />
      }
      {
        isMPINAsked &&
        <EnterMPINModal
          modalToggle={isMPINAsked}
          setModalToggle={setIsMPINAsked}
          callbackFunction={optionClicked === "notification" ? dispatchUpdateNotificationAction : dispatchUpdateLanguageAction}
        />
      }
    </div>
  );
};
export default withRouter(Setting);
