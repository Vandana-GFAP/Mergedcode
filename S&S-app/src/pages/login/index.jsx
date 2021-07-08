import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentUserDetails } from '../../redux/actions/userData.action';
import { getLanguageText } from '../../language';
import { loginWithMobileAndPassword } from '../../redux/actions/login.action';
import GetOTPModal from '../../components/modal/password/GetOTPModal';
import { setUserMobileNumber } from '../../redux/actions/util.action';
import { getLocalStorageItemValue } from '../../redux/actions';
import ErrorModal from '../../components/modal/output/ErrorModal';

import './style.css';
import useAppLanguage from '../../hooks/useAppLanguage';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isMobileEmpty, setIsMobileEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [language] = useAppLanguage();

  const getCurrentUserData = useCallback(() => {
    dispatch(getCurrentUserDetails({ payload: { mobile: mobileNumber } }))
      .then(() => {
        history.push('/home');
      })
      .catch(err => {
        console.error(err);
      });
  }, [mobileNumber, dispatch, history])

  useEffect(() => {
    if (getLocalStorageItemValue({ itemName: 'token' }))
      getCurrentUserData();
  }, [getCurrentUserData]);

  const forgetPassword = () => {
    const validation = (() => {
      if ((mobileNumber?.length !== 10)) {
        setIsMobileEmpty(true);
        return false;
      }
      return true;
    })();

    if (validation) {
      console.log('Forget Password !!!');
      dispatch(setUserMobileNumber({ mobileNumber }));
      setForgetPasswordModal(true);
    }
  };

  const onLogin = () => {
    const validation = (() => {
      if (!(mobileNumber?.length)) {
        setIsMobileEmpty(true);
        if (!(password?.length)) {
          setIsPasswordEmpty(true);
        }
        return false;
      }
      if (!(password?.length)) {
        setIsPasswordEmpty(true);
        return false;
      }
      if (mobileNumber?.length != 10) {
        setIsMobileEmpty(true);
        return false;
      }
      return true;
    })();

    if (validation) {
      dispatch(setUserMobileNumber({ mobileNumber }))
      dispatch(loginWithMobileAndPassword({ loginPayload: { mobile: mobileNumber, mpasswd: password } }))
        .then(() => {
          console.log('Logged In !!!');
          setError(false);
          getCurrentUserData();
        })
        .catch(err => {
          console.error("Error->", err);
          setError(true);
        });
    }
  };

  const handleMobileNumber = (value) => {
    setMobileNumber(value);
  }

  return (
    <>
      <div
        className='login-container'
        style={{
          // height: window.innerHeight,
          height: '100vh',
        }}
      >
        <div className='_login-box'>
          <div className='login'>
            <h1>{getLanguageText({ language, key: 'login' })}</h1>
          </div>
          <div className='input-box'>
            <div className='input-field d-flex align-items-center'>
              {mobileNumber?.length > 0 && <p>+91</p>}
              <input
                className='input_phone'
                placeholder={getLanguageText({
                  language,
                  key: 'phonePlaceholder',
                })}
                value={mobileNumber}
                onChange={e => handleMobileNumber(e.target.value)}
                type='text'
                maxLength="10"
                required={true}
                onFocus={() => setIsMobileEmpty(false)}
              />
            </div>
            {
              isMobileEmpty && (
                <p className='error'>
                  *{getLanguageText({ language, key: 'invalidPhone' })}
                </p>
              )}
            <input
              className='input-field'
              placeholder={getLanguageText({
                language,
                key: 'passwordPlaceholder',
              })}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type='password'
              required={true}
              onFocus={() => setIsPasswordEmpty(false)}
            />
            {
              isPasswordEmpty &&
              <p className='error'>
                *{getLanguageText({ language, key: 'invalidPassword' })}
              </p>
            }
          </div>
          <div className='forget-password'>
            <p>{getLanguageText({ language, key: 'forgetPassword' })}</p>
            <a className='forgot_link' onClick={() => forgetPassword()}>
              {getLanguageText({ language, key: 'resetPassword' })}
            </a>
          </div>
          {
            error &&
            <p
              className='error'
              style={{
                textAlign: 'center',
              }}
            >
              *{getLanguageText({ language, key: 'invalidCredentials' })}
            </p>
          }
          <div className='login-btn'>
            <div onClick={() => onLogin()}>
              <p>{getLanguageText({ language, key: 'loginBtn' })}</p>
            </div>
          </div>
        </div>
      </div>
      {
        forgetPasswordModal &&
        <GetOTPModal
          modalToggle={forgetPasswordModal}
          setModalToggle={setForgetPasswordModal}
          previousScreenName="login"
        />
      }
      {
        errorCard &&
        <ErrorModal
          modalToggle={errorCard}
          setModalToggle={setErrorCard}
        />
      }
    </>
  );
};

export default withRouter(Login);
