import React from "react";
import { referEarn } from "../../assets/images";
import "./index.css";
import MainButton from "../../components/mainButton";
import { getLanguageText } from "../../language";
import { useSelector } from "react-redux";
const ReferEarn = () => {
  const UserData = useSelector((state) => state.UserData) || {};
  const { language } = UserData || {};

  return (
    <>
      <div className="align-center ">
        <div className="referimage">
          <img src={referEarn} alt="refer Image" />
        </div>
        <p className="refer_01">
          {getLanguageText({ language, key: "earnFriend" })}
        </p>
        <p className="refer_02">
          {getLanguageText({ language, key: "uniqueCode" })}
        </p>
        <p className="refer03"> JHAGDV125</p>
        <p className="dark_line"></p>
        <p className="orsection">OR</p>
        <div style={{ padding: "0.5rem  1.875rem 0 1.875rem" }}>
          <MainButton label={getLanguageText({ language, key: "shareCode" })} />
        </div>
        <div className="note_boxs">
          <p className="note_txt">
            {getLanguageText({ language, key: "note" })}
          </p>
          <p className="note_detail">
            {getLanguageText({ language, key: "noteDetails" })}
          </p>
        </div>
      </div>
    </>
  );
};
export default ReferEarn;
