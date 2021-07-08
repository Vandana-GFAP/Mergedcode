import React, { useState, useEffect } from "react";
import ResetPasswordModal from "../../components/modal/ResetPasswordModal";
import { userData } from "../../dummyData";
import * as actions from "../../redux/actions";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import "./style.css";
import { getLanguageText } from "../../language";
// ###Importing Error modal
import ErrorModal from "../../components/modal/ErrorModal";

const Login = (props) => {
  const { history = {} } = props || {};
  // ###State of Error modal
  const [errorCard, setErrorCard] = useState(false);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [isMobileEmpty, setIsMobileEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const [error, setError] = useState(false);

  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (Object.keys(UserData).length <= 0) {
        //TODO: API call to get user data...
        try {
          store.dispatch(actions.setUserData({ ...userData }));
        } catch (err) {
          console.log("<<< Error in fetching user data >>>\n", err);
        }
      }
      history.push("home");
    }
  }, []);

  const forgetPassword = () => {
    const validation = (() => {
      if (!(mobile?.length === 10)) {
        setIsMobileEmpty(true);

        return false;
      }
      return true;
    })();

    if (validation) {
      console.log("Forget Password !!!");
      setForgetPasswordModal(true);
    }
  };

  const onLogin = () => {
    const validation = (() => {
      const validatePhoneExpression = /^[7896][0-9]{9}$/;
      const validatePasswordExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!(mobile?.length > 0)) {
        setIsMobileEmpty(true);
        return false;
      }
      if (!(password?.length > 0)) {
        setIsPasswordEmpty(true);
        return false;
      }

      if (!password.match(validatePasswordExpression)) {
        setIsPasswordEmpty(true);
        return;
      }

      if(!mobile.match(validatePhoneExpression)){
        setIsMobileEmpty(true);
        return false;
      }
      if (mobile?.length != 10) {
        setIsMobileEmpty(true);
        return false;
      }

      return true;
    })();

    if (validation) {
      //TODO: Call backend for authentication
      const res = true; // true if login is successfull

      // ###Error modal state to be true
      setError(res);

      if (!error) {
        const token = "testToken";
        localStorage.setItem("token", token);

        //TODO: API call to get user data
        try {
          store.dispatch(actions.setUserData({ ...userData }));
          console.log("Logged In !!!");
          history.push("home");
        } catch (err) {
          // ###Error modal state to be true

          setErrorCard(true);
          console.log("<<< Error in fetching user data>>>\n", err);
        }
      }
    }
  };

  return (
    <div>
      {/* ###Error modal */}

      <ErrorModal modalToggle={errorCard} setModalToggle={setErrorCard} />
      <ResetPasswordModal
        modalToggle={forgetPasswordModal}
        setModalToggle={setForgetPasswordModal}
        phoneNumber={mobile}
      />
      <div
        className="login-container"
        style={{
          height: "100vh",
        }}
      >
        <div className="_login-box">
          <div className="login">
            <h1>{getLanguageText({ language, key: "login" })}</h1>
          </div>

          <div className="input-box">
            <div className="input-field d-flex align-items-center">
              {mobile?.length > 0 && <p>+91</p>}
              <input
                className="input_phone"
                placeholder={getLanguageText({
                  language,
                  key: "phonePlaceholder",
                })}
                value={mobile}
                onChange={(e) => {
                  if (e.target.value.length <= 10) setMobile(e.target.value);
                }}
                type="number"
                required={true}
                onFocus={() => setIsMobileEmpty(false)}
              />
            </div>

            {isMobileEmpty && (
              <p className="error">
                *{getLanguageText({ language, key: "invalidPhone" })}
              </p>
            )}

            <input
              className="input-field"
              placeholder={getLanguageText({
                language,
                key: "passwordPlaceholder",
              })}
              value={password}
              onChange={(e) => {
                if (e.target.value.length <= 16) setPassword(e.target.value);
              }}
              type="password"
              required={true}
              onFocus={() => setIsPasswordEmpty(false)}
            />

            {isPasswordEmpty && (
              <p className="error">
                *{getLanguageText({ language, key: "invalidPassword" })}
              </p>
            )}
          </div>

          <div className="forget-password">
            <p>{getLanguageText({ language, key: "forgetPassword" })}</p>
            <a className="forgot_link" onClick={() => forgetPassword()}>
              {getLanguageText({ language, key: "resetPassword" })}
            </a>
          </div>

          {error && (
            <p
              className="error"
              style={{
                textAlign: "center",
              }}
            >
              *{getLanguageText({ language, key: "invalidCredentials" })}
            </p>
          )}

          <div className="login-btn">
            <div onClick={() => onLogin()}>
              <p>{getLanguageText({ language, key: "loginBtn" })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
