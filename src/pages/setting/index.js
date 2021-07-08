import React, { useState, useEffect } from "react";
import ChangeMPinModal from "../../components/modal/ChangeMPinModal";
import ChangePasswordModal from "../../components/modal/ChangePasswordModal";
import CheckMpinModal from "../../components/modal/CheckMpinModal";
import Switch from "@material-ui/core/Switch";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import * as actions from "../../redux/actions";
import { userData } from "../../dummyData";
import "./index.css";
import { getLanguageText } from "../../language";
import Loader from "../../components/loader";

const Setting = (props) => {
  const { history = {} } = props || {};
  const [loading, setLoading] = useState(false);

  const UserData = useSelector((state) => state.UserData) || {};

  const [notification, setNotification] = useState(UserData?.notification);
  const [languageOption, setLanguageOption] = useState(
    UserData?.language === "hi" ? true : false
  );
  const [changePassword, setChangePassword] = useState(false);
  const [changeMpin, setChangeMpin] = useState(false);
  const [checkMpin, setCheckMpin] = useState(false);
  const { language } = UserData || {};

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else if (Object.keys(UserData).length <= 0) {
      //TODO: API call to get user data...
      try {
        store.dispatch(actions.setUserData({ ...userData }));
      } catch (err) {
        console.log("<<< Error in fetching user data >>>\n", err);
      }
    }
  }, []);

  const onLanguageClick = (e) => {
    setLoading(true);

    setLanguageOption(e);

    //TODO: API call to update language in database

    try {
      setLoading(false);

      if (e) {
        store.dispatch(actions.setUserData({ ...userData, language: "hi" }));
      } else {
        store.dispatch(actions.setUserData({ ...userData, language: "en" }));
      }
    } catch (err) {
      setLoading(false);

      console.log("<<< Error in changing language >>>");
    }
  };

  const options = [
    {
      type: "toggle",
      heading: getLanguageText({ language, key: "notification" }),
      subheading: getLanguageText({
        language,
        key: "notificationSubHeading",
      }),
      value: notification,
      onClick: (e) => {
        if (e) setCheckMpin(true);
        else setNotification(false);
      },
    },
    {
      type: "toggle",
      heading: getLanguageText({ language, key: "languages" }),
      subheading: getLanguageText({ language, key: "toggleLanguages" }),
      value: languageOption,
      onClick: onLanguageClick,
    },
    {
      type: "btn",
      heading: getLanguageText({ language, key: "changePassword" }),
      subheading: getLanguageText({
        language,
        key: "changePasswordSubheading",
      }),
      value: changePassword,
      btnLabel: "Change Password",
      onClick: setChangePassword,
    },
    {
      type: "btn",
      heading: getLanguageText({ language, key: "changeMPIn" }),
      subheading: getLanguageText({
        language,
        key: "changeMPInSubheading",
      }),
      value: changeMpin,
      btnLabel: "Change m-Pin",
      onClick: setChangeMpin,
    },
  ];

  const renderToggle = ({ item, index }) => {
    const { heading, subheading, value, onClick } = item;
    return (
      <div key={index} className="box01">
        <div>
          <p className="box_heading01">{heading}</p>
          <p className="box_subheading01">{subheading}</p>
        </div>
        <Switch
          checked={value}
          onChange={(e) => onClick(e.target.checked)}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    );
  };

  const renderBtn = ({ item, index }) => {
    const { heading, subheading, onClick } = item;
    return (
      <div onClick={() => onClick(true)} key={index} className="box01">
        <div>
          <p className="box_heading01">{heading}</p>
          <p className="box_subheading01">{subheading}</p>
        </div>
        <div className="arrow_div">
          <IoIosArrowForward className="arrow_style" />
        </div>
      </div>
    );
  };
  if (loading) return <Loader />;

  return (
    <div
      style={{
        height: "92vh",
      }}
    >
      <ChangeMPinModal
        modalToggle={changeMpin}
        setModalToggle={setChangeMpin}
      />

      <ChangePasswordModal
        modalToggle={changePassword}
        setModalToggle={setChangePassword}
      />

      <CheckMpinModal
        modalToggle={checkMpin}
        setModalToggle={setCheckMpin}
        callBack={() => {
          setNotification(true);
        }}
      />
      <div className="d-flex flex-column align-items-center justify-content-center">
        {options?.map((item, index) => {
          const { type } = item;
          if (type === "toggle") {
            return renderToggle({ item, index });
          } else {
            return renderBtn({ item, index });
          }
        })}
      </div>
    </div>
  );
};
export default Setting;
